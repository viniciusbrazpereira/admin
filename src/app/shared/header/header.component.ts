import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';


interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {

    // caminho percorrido pela navegação
    breadcrumbs: IBreadcrumb[];

    // titulo apresentado no header
    title: String = "";

    // indica que a janela de confirmação de
    // logout deve ser apresentada
    state = {
        showLogout: false
    }

    // listener dos eventos de logoff
    logoutListener: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        private translate: TranslateService) {

        this.breadcrumbs = [];

        /*
        this.logoutListener = GlobalEventService.subscribe(GlobalEventName.ON_LOGOUT, data => {
            this.state.showLogout = true;
        });
        */
    }


    ngOnInit() {

        // constrói titulo da página (traduzido)
        let key = this.buildTitle(this.activatedRoute.root);
        this.title = this.translateText(key);

        // se registra para os eventos de navegação
        // para construir os breadcrumbs
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {

            const root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.buildBreadcrumbs(root);

            key = this.buildTitle(this.activatedRoute.root);
            this.title = this.translateText(key);
        });

    }

    private translateText(key){
        let value = "";
        if (key) {
            this.translate.get(key).subscribe((label: string) => {
                value = label;
            });
        }
        return value;
    }

    ngOnDestroy() {
        this.logoutListener.unsubscribe();
    }

    logout() {
        //this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    redirectLink(url, params){
        this.router.navigate([url]);
    }

    private buildBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {

        // nome da propriedade que deve
        // ser configurada na rota
        const ROUTE_DATA_BREADCRUMB = "breadcrumb";

        // obtém as rotas filhas
        const children: ActivatedRoute[] = route.children;

        // retorna se não houver mais filhas
        if (children.length === 0) {
            return breadcrumbs;
        }

        // itera sobre as filhas
        for (const child of children) {

            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verifica se a propriedade "breadcrumb"
            // foi configurada para essa rota
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.buildBreadcrumbs(child, url, breadcrumbs);
            }

            // obtém o segmento de URL da rota
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            // inclui o segmento da URL da rota para URL
            url += `/${routeURL}`;

            // inclui o breadcrumb
            const breadcrumb: IBreadcrumb = {
                label: this.translateText(child.snapshot.data[ROUTE_DATA_BREADCRUMB]),
                params: child.snapshot.params,
                url: url
            };

            breadcrumbs.push(breadcrumb);

            // recursivamente...
            return this.buildBreadcrumbs(child, url, breadcrumbs);

        }

        //we should never get here, but just in case
        return breadcrumbs;

    }

    private buildTitle(route: ActivatedRoute, url: string="", title: string=""): string {

        // nome da propriedade que deve
        // ser configurada na rota
        const ROUTE_DATA_TITLE = "title";

        const children: ActivatedRoute[] = route.children;

        // se não houver mais filhos retorna
        // o titulo construído até aqui
        if (children.length === 0) {
            return title;
        }

        for (const child of children) {

            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verifica se a propriedade "title"
            // foi configurada para essa rota
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_TITLE)) {
                return this.buildTitle(child, url, title);
            }

            // obtem titulo configurado
            title = child.snapshot.data[ROUTE_DATA_TITLE];

            // obtém recursivamente até o
            // último nível de profundidade
            return this.buildTitle(child, url, title);

        }

        return title;

    }




}
