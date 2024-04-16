import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PrayerRequestComponent } from './prayer-request/prayer-request.component';
import { OfferingComponent } from './offering/offering.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MeetingComponent } from './meeting/meeting.component';

export const routes: Routes = [
    { path: 'signup', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'homePage', component: HomePageComponent },
            { path: '', component: HomePageComponent },
            { path: 'prayerRequest', component: PrayerRequestComponent },
            { path: 'meeting', component: MeetingComponent },
            { path: 'offering', component: OfferingComponent },

        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
