import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/form/login/login.component';
import { SettingLoginComponent } from './system/settings/setting-login/setting-login.component';
import { MyProfileComponent } from './system/user/my-profile/my-profile.component';

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
