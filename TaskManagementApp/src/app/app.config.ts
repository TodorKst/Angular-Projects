import {ApplicationConfig} from "@angular/core";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {routes} from "./app.routes";

export const appConfiguration: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
}
