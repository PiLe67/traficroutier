import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"traficroutier-34bcc","appId":"1:967415649400:web:b0dd1119e3ace8d973898d","storageBucket":"traficroutier-34bcc.appspot.com","apiKey":"AIzaSyA3lK62dBliJ0in-s13BWTqh5Ev4R2_7QA","authDomain":"traficroutier-34bcc.firebaseapp.com","messagingSenderId":"967415649400"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
