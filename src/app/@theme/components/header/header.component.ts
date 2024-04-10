import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { Router } from '@angular/router';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { Subject } from 'rxjs';
import {
  AuthService,
  WebStorageService,
  ProjectService,
  EStorageTarget,
} from '../../../shared/services/public-api';
import { filter, map, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'rp-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentPage;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  user: any;
  username: string;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  logOutMenu = [{ title: 'Log out' }];

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private userService: UserData,
    private storageService: WebStorageService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.username = this.storageService.getItem('username', {
      target: EStorageTarget.LocalStorage
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });

    this.userService
      .getUsers()
      .subscribe((users: any) => (this.user = users.avatar));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => (this.currentTheme = themeName));

    this.authService.currentPage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentPage => {
        this.currentPage = currentPage;
      });

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu' || tag === 'logOutMenu'),
        map(({ item: { title } }) => title)
      )
      .subscribe(title => {
        console.log('title', title);
        if (title === 'Log out') {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        if (title === 'Teams') {
          this.router.navigate(['/settings/teams']);
        }

        if (title === 'Users') {
          this.router.navigate(['/settings/manage-users']);
        }

        if (title === 'Prices') {
          this.router.navigate(['/settings/my-prices']);
        }

        if (title === 'Profile') {
          this.router.navigate([`/app/user-profile`]);
        }

        // if (title === 'Subscriptions') {
        //   console.log('ht');
        //   window.open(this.pabblyLink, '_blank');
        // }

        if (title === 'CAD') {
          this.router.navigate([`/app/cad`]);
        }

        if (title === 'Memo Tags') {
          this.router.navigate([`/settings/memo-tags`]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
