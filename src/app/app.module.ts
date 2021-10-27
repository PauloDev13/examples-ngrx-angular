import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from '~/auth/state/auth.effects';
import { AuthTokenInterceptor } from '~/interceptors/auth-token.interceptor';
// import { entityConfig } from '~/posts/entity-metadata';
// import { PostsModule } from '~/posts/posts/posts.module';
import { appReducer } from '~/store/app.state';
import { CustomSerializer } from '~/store/router/custom-serializer';

import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, LoadingSpinnerComponent],
  imports: [
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    EntityDataModule.forRoot({}),
    // PostsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
