import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PrayerRequestComponent } from './prayer-request/prayer-request.component';
import { MeetingComponent } from './meeting/meeting.component';
import { OfferingComponent } from './offering/offering.component';

export const routes: Routes = [
    { path: 'signup', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'prayerRequest', component: PrayerRequestComponent },
            { path: 'meeting', component: MeetingComponent },
            { path: 'offering', component: OfferingComponent },

        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
