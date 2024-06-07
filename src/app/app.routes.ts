import { Routes } from '@angular/router';

import { ListComponent } from '@products/pages/list/list.component'
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component'
import { LayoutComponent } from '@shared/components/layout/layout.component'
import { NotFoundComponent } from '@info/pages/not-found/not-found.component'

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                // component: ListComponent // HACE PESAR MAS EL ARCHIVO
                loadComponent: () => import('./domains/products/pages/list/list.component').then(m => m.ListComponent) //LE DICE AL ARCHIVO QUE LO CARGUE SIEMPRE Y CUANDO ESTE EN EL SITIO QUE SE UTILIZA
            },
            {
                path: 'about',
                // component: AboutComponent
                loadComponent: () => import('./domains/info/pages/about/about.component') //PARA AHORRAR EL TEN VAMOS AL COMPONENTE Y LE COLOCAMOS EXPORT DEFAULT
            },
            {
                path: 'product/:id',
                component: ProductDetailComponent
            }
        ]
    },

    {
        path: '**',
        component: NotFoundComponent
    }

];
