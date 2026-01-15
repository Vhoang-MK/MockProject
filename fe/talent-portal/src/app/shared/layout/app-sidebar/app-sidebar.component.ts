import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { SidebarWidgetComponent } from './app-sidebar-widget.component';
import { combineLatest, Subscription } from 'rxjs';

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    SafeHtmlPipe,
    SidebarWidgetComponent
  ],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent {

  // Main nav items
  navItems: NavItem[] = [
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z" fill="currentColor"></path></svg>`,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill="currentColor"></path></svg>`,
      name: "Users",
      path: "/profile",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C11.5858 2 11.25 2.33579 11.25 2.75V12C11.25 12.4142 11.5858 12.75 12 12.75H21.25C21.6642 12.75 22 12.4142 22 12C22 6.47715 17.5228 2 12 2ZM12.75 11.25V3.53263C13.2645 3.57761 13.7659 3.66843 14.25 3.80098V3.80099C15.6929 4.19606 16.9827 4.96184 18.0104 5.98959C19.0382 7.01734 19.8039 8.30707 20.199 9.75C20.3316 10.2341 20.4224 10.7355 20.4674 11.25H12.75ZM2 12C2 7.25083 5.31065 3.27489 9.75 2.25415V3.80099C6.14748 4.78734 3.5 8.0845 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C15.9155 20.5 19.2127 17.8525 20.199 14.25H21.7459C20.7251 18.6894 16.7492 22 12 22C6.47715 22 2 17.5229 2 12Z" fill="currentColor"></path></svg>`,
      name: "Evaluation",
      path: "/calendar",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 5.5C3.25 4.25736 4.25736 3.25 5.5 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V18.5C20.75 19.7426 19.7426 20.75 18.5 20.75H5.5C4.25736 20.75 3.25 19.7426 3.25 18.5V5.5ZM5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5V8.58325L19.25 8.58325V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H5.5ZM19.25 10.0833H4.75V18.5C4.75 18.9142 5.08579 19.25 5.5 19.25H18.5C18.9142 19.25 19.25 18.9142 19.25 18.5V10.0833Z" fill="currentColor"></path></svg>`,
      name: "Projects",
      path: "/basic-tables",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H18.5001C19.7427 20.75 20.7501 19.7426 20.7501 18.5V5.5C20.7501 4.25736 19.7427 3.25 18.5001 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H18.5001C18.9143 4.75 19.2501 5.08579 19.2501 5.5V18.5C19.2501 18.9142 18.9143 19.25 18.5001 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V5.5ZM7.5 8C7.08579 8 6.75 8.33579 6.75 8.75C6.75 9.16421 7.08579 9.5 7.5 9.5H9.5C9.91421 9.5 10.25 9.16421 10.25 8.75C10.25 8.33579 9.91421 8 9.5 8H7.5ZM6.75 12.25C6.75 11.8358 7.08579 11.5 7.5 11.5H16.5C16.9142 11.5 17.25 11.8358 17.25 12.25C17.25 12.6642 16.9142 13 16.5 13H7.5C7.08579 13 6.75 12.6642 6.75 12.25ZM7.5 15C7.08579 15 6.75 15.3358 6.75 15.75C6.75 16.1642 7.08579 16.5 7.5 16.5H13.5C13.9142 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 13.9142 15 13.5 15H7.5Z" fill="currentColor"></path></svg>`,
      name: "Tasks",
      path: "/form-elements",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.50391 4.25C8.50391 3.83579 8.83969 3.5 9.25391 3.5H15.2777C15.4766 3.5 15.6674 3.57902 15.8081 3.71967L18.2807 6.19234C18.4214 6.333 18.5004 6.52376 18.5004 6.72268V16.75C18.5004 17.1642 18.1646 17.5 17.7504 17.5H16.248V17.4993H14.748V17.5H9.25391C8.83969 17.5 8.50391 17.1642 8.50391 16.75V4.25ZM14.748 19H9.25391C8.01126 19 7.00391 17.9926 7.00391 16.75V6.49854H6.24805C5.83383 6.49854 5.49805 6.83432 5.49805 7.24854V19.75C5.49805 20.1642 5.83383 20.5 6.24805 20.5H13.998C14.4123 20.5 14.748 20.1642 14.748 19.75L14.748 19ZM7.00391 4.99854V4.25C7.00391 3.00736 8.01127 2 9.25391 2H15.2777C15.8745 2 16.4468 2.23705 16.8687 2.659L19.3414 5.13168C19.7634 5.55364 20.0004 6.12594 20.0004 6.72268V16.75C20.0004 17.9926 18.9931 19 17.7504 19H16.248L16.248 19.75C16.248 20.9926 15.2407 22 13.998 22H6.24805C5.00541 22 3.99805 20.9926 3.99805 19.75V7.24854C3.99805 6.00589 5.00541 4.99854 6.24805 4.99854H7.00391Z" fill="currentColor"></path></svg>`,
      name: "Daily Reports",
      path: "/invoice",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.52422 4.40137C6.84219 3.50619 8.41271 3 10.0918 3C14.7839 3 18.5918 6.80786 18.5918 11.5C18.5918 12.7286 18.3328 13.8993 17.8674 14.9602L21.5303 18.6231C21.8232 18.916 21.8232 19.3909 21.5303 19.6838C21.2374 19.9767 20.7625 19.9767 20.4697 19.6838L16.7929 16.007C15.1794 17.5547 12.9956 18.5 10.5918 18.5C5.89965 18.5 2.0918 14.6921 2.0918 10C2.0918 7.54551 3.07806 5.3224 4.68286 3.7033C4.95594 3.90489 5.23674 4.13818 5.52422 4.40137ZM10.0918 4.5C8.70197 4.5 7.40567 4.90232 6.30534 5.59645C6.63623 5.92997 6.97174 6.30183 7.30792 6.70726C8.19077 6.25127 9.19017 6 10.25 6C14.1157 6 17.25 9.13429 17.25 13C17.25 13.6381 17.1604 14.2555 16.9929 14.8401L17.9204 15.7675C18.1995 14.6968 18.3509 13.5716 18.3509 12.4117C18.3509 7.60697 14.5956 3.68438 10.0918 4.5ZM10.5918 17C14.4578 17 17.5918 13.866 17.5918 10C17.5918 9.35667 17.5004 8.73429 17.3295 8.14549C16.3921 6.02119 14.5598 4.5 12.25 4.5C11.2149 4.5 10.234 4.74066 9.36261 5.17034C11.2462 5.75461 13.0918 7.31343 13.0918 10C13.0918 13.0376 10.6294 15.5 7.5918 15.5C5.34326 15.5 3.39102 14.0978 2.59232 12.1213C2.67019 14.8684 4.93494 17 8.25 17C9.04013 17 9.79851 16.8683 10.5018 16.6279C10.5618 16.875 10.5918 17.1336 10.5918 17.4V17Z" fill="currentColor"></path></svg>`,
      name: "Notifications",
      path: "/alerts",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C12.4142 2.75 12.75 3.08579 12.75 3.5V4.25H17.5C18.7426 4.25 19.75 5.25736 19.75 6.5V18.5C19.75 19.7426 18.7426 20.75 17.5 20.75H6.5C5.25736 20.75 4.25 19.7426 4.25 18.5V6.5C4.25 5.25736 5.25736 4.25 6.5 4.25H11.25V3.5C11.25 3.08579 11.5858 2.75 12 2.75ZM6.5 5.75C6.08579 5.75 5.75 6.08579 5.75 6.5V18.5C5.75 18.9142 6.08579 19.25 6.5 19.25H17.5C17.9142 19.25 18.25 18.9142 18.25 18.5V6.5C18.25 6.08579 17.9142 5.75 17.5 5.75H6.5ZM8 8.5C8 8.08579 8.33579 7.75 8.75 7.75H15.25C15.6642 7.75 16 8.08579 16 8.5C16 8.91421 15.6642 9.25 15.25 9.25H8.75C8.33579 9.25 8 8.91421 8 8.5ZM8.75 11.25C8.33579 11.25 8 11.5858 8 12C8 12.4142 8.33579 12.75 8.75 12.75H15.25C15.6642 12.75 16 12.4142 16 12C16 11.5858 15.6642 11.25 15.25 11.25H8.75ZM8 15.5C8 15.0858 8.33579 14.75 8.75 14.75H12.25C12.6642 14.75 13 15.0858 13 15.5C13 15.9142 12.6642 16.25 12.25 16.25H8.75C8.33579 16.25 8 15.9142 8 15.5Z" fill="currentColor"></path></svg>`,
      name: "Activity Logs",
      path: "/line-chart",
    },
  ];
  // Others nav items (Settings & Logout)
  othersItems: NavItem[] = [
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2792 2.15224C13.8192 1.79867 13.2022 1.72945 12.6752 1.97313L11.0792 2.71013C10.9494 2.77011 10.8039 2.78608 10.6642 2.75565L8.93219 2.37765C8.38319 2.25765 7.81819 2.44265 7.43219 2.86065L6.29919 4.09265C6.20019 4.19965 6.07319 4.27265 5.93319 4.30265L4.20119 4.68065C3.65219 4.80065 3.20519 5.20865 3.03919 5.74665L2.50019 7.41965C2.45719 7.55265 2.37319 7.66865 2.26019 7.75165L0.856192 8.78565C0.396192 9.13965 0.166192 9.70965 0.261192 10.2798L0.580192 12.0237C0.605192 12.1647 0.583192 12.3102 0.518192 12.4387L-0.273808 13.9978C-0.526808 14.4928 -0.479808 15.0877 -0.149808 15.5387L1.00019 17.0607C1.08319 17.1707 1.12819 17.3027 1.12919 17.4387L1.14619 19.2037C1.15119 19.7637 1.46019 20.2757 1.95219 20.5477L3.48819 21.3987C3.61319 21.4687 3.71419 21.5747 3.77819 21.7027L4.60819 23.3587C4.85019 23.8427 5.33419 24.1637 5.87919 24.1887L7.64319 24.2657C7.78219 24.2717 7.91619 24.3217 8.02519 24.4087L9.42919 25.5288C9.88619 25.8938 10.5042 25.9738 11.0342 25.7388L12.6302 24.9998C12.7602 24.9398 12.9062 24.9238 13.0462 24.9548L14.7782 25.3328C15.3272 25.4528 15.8922 25.2678 16.2782 24.8498L17.4112 23.6178C17.5102 23.5108 17.6372 23.4378 17.7772 23.4078L19.5092 23.0298C20.0582 22.9098 20.5052 22.5018 20.6712 21.9638L21.2102 20.2908C21.2532 20.1578 21.3372 20.0418 21.4502 19.9588L22.8542 18.9248C23.3142 18.5708 23.5442 18.0008 23.4492 17.4307L23.1302 15.6867C23.1052 15.5457 23.1272 15.4002 23.1922 15.2717L23.9842 13.7128C24.2372 13.2178 24.1902 12.6228 23.8602 12.1718L22.7102 10.6497C22.6272 10.5397 22.5822 10.4077 22.5812 10.2717L22.5642 8.50665C22.5592 7.94665 22.2502 7.43465 21.7582 7.16265L20.2222 6.31165C20.0972 6.24165 19.9962 6.13565 19.9322 6.00765L19.1022 4.35165C18.8602 3.86765 18.3762 3.54665 17.8312 3.52165L16.0672 3.44465C15.9282 3.43865 15.7942 3.38865 15.6852 3.30165L14.2792 2.15224ZM12.0002 16C14.2093 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2093 8 12.0002 8C9.79104 8 8.00018 9.79086 8.00018 12C8.00018 14.2091 9.79104 16 12.0002 16Z" fill="currentColor"></path></svg>`,
      name: "Settings",
      path: "/blank",
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H4.02744L5.98809 9.56905C6.30259 9.2966 6.33711 8.82311 6.06466 8.50861C5.79221 8.19411 5.31872 8.15959 5.00422 8.43204L1.50422 11.4654C1.34189 11.6056 1.25 11.8112 1.25 12.028V12C1.25 12.2025 1.33414 12.3965 1.48214 12.5345L5.00422 15.568C5.31872 15.8404 5.79221 15.8059 6.06466 15.4914C6.33711 15.1769 6.30259 14.7034 5.98809 14.4309L4.02744 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12ZM9.25 7C9.25 7.41421 9.58579 7.75 10 7.75H17.5C18.1904 7.75 18.75 8.30964 18.75 9V19C18.75 19.6904 18.1904 20.25 17.5 20.25H10C9.58579 20.25 9.25 20.5858 9.25 21C9.25 21.4142 9.58579 21.75 10 21.75H17.5C19.0188 21.75 20.25 20.5188 20.25 19V9C20.25 7.48122 19.0188 6.25 17.5 6.25H10C9.58579 6.25 9.25 6.58579 9.25 7Z" fill="currentColor"></path></svg>`,
      name: "Logout",
      path: "/signin",
    },
  ];

  openSubmenu: string | null | number = null;
  subMenuHeights: { [key: string]: number } = {};
  @ViewChildren('subMenu') subMenuRefs!: QueryList<ElementRef>;

  readonly isExpanded$;
  readonly isMobileOpen$;
  readonly isHovered$;

  private subscription: Subscription = new Subscription();

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  ngOnInit() {
    // Subscribe to router events
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setActiveMenuFromRoute(this.router.url);
        }
      })
    );

    // Subscribe to combined observables to close submenus when all are false
    this.subscription.add(
      combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
        ([isExpanded, isMobileOpen, isHovered]) => {
          if (!isExpanded && !isMobileOpen && !isHovered) {
            // this.openSubmenu = null;
            // this.savedSubMenuHeights = { ...this.subMenuHeights };
            // this.subMenuHeights = {};
            this.cdr.detectChanges();
          } else {
            // Restore saved heights when reopening
            // this.subMenuHeights = { ...this.savedSubMenuHeights };
            // this.cdr.detectChanges();
          }
        }
      )
    );

    // Initial load
    this.setActiveMenuFromRoute(this.router.url);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSubmenu(section: string, index: number) {
    const key = `${section}-${index}`;

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      });
    }
  }

  onSidebarMouseEnter() {
    this.isExpanded$.subscribe(expanded => {
      if (!expanded) {
        this.sidebarService.setHovered(true);
      }
    }).unsubscribe();
  }

  private setActiveMenuFromRoute(currentUrl: string) {
    const menuGroups = [
      { items: this.navItems, prefix: 'main' },
      { items: this.othersItems, prefix: 'others' },
    ];

    menuGroups.forEach(group => {
      group.items.forEach((nav, i) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (currentUrl === subItem.path) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu = key;

              setTimeout(() => {
                const el = document.getElementById(key);
                if (el) {
                  this.subMenuHeights[key] = el.scrollHeight;
                  this.cdr.detectChanges(); // Ensure UI updates
                }
              });
            }
          });
        }
      });
    });
  }

  onSubmenuClick() {
    console.log('click submenu');
    this.isMobileOpen$.subscribe(isMobile => {
      if (isMobile) {
        this.sidebarService.setMobileOpen(false);
      }
    }).unsubscribe();
  }


}
