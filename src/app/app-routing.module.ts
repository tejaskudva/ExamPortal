import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { UserQuizComponent } from './pages/user/user-quiz/user-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent, testRecord } from './pages/user/start-quiz/start-quiz.component';
import { UserRecordComponent } from './pages/user/user-record/user-record.component';

const routes: Routes = [
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"admin",
    component:DashboardComponent,
    canActivate: [AdminGuard],

    children: [
      {
        path:"",
        component: WelcomeComponent,
      },
      {
        path:"profile",
        component: ProfileComponent,
      },
      {
        path:"categories",
        component: ViewCategoriesComponent,
      },
      {
        path:"add-category",
        component: AddCategoriesComponent,
      },
      {
        path:"view-quiz",
        component: ViewQuizComponent,
      },
      {
        path:"add-quiz",
        component: AddQuizComponent,
      },
      {
        path:"quiz/:qid",
        component: UpdateQuizComponent,
      },
      {
        path:"view-questions/:id/:title",
        component: ViewQuizQuestionsComponent,
      },
      {
        path:"add-question/:id",
        component: AddQuestionComponent,
      },
      {
        path:"update-question/:id",
        component: UpdateQuestionComponent,
      }
    ]
  },
  {
    path:"user",
    component:UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path:"",
        component: UserWelcomeComponent,
      },
      {
        path:"profile",
        component: ProfileComponent,
      },
      {
        path:"quiz/:cid",
        component: UserQuizComponent,
      },
      {
        path:"instructions/:qid",
        component: InstructionsComponent,
      },
      {
        path:"record",
        component: UserRecordComponent,
      }      
    ]
  },
  {
    path:"start-quiz/:qid",
    canActivate: [NormalGuard],
    component: StartQuizComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
