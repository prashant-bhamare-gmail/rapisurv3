import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService, WebStorageService, STORAGE_KEY_USER_DATA, EStorageTarget, } from '../shared/services/public-api';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MENU_ITEMS, COLLAB_MENU_ITEMS } from './pages-menu';
import { NbIconLibraries } from '@nebular/theme';
import { homeOutline } from 'ionicons/icons';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  user: any;
  username: string;
  menu = MENU_ITEMS;
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private storageService: WebStorageService,
    private authService: AuthService,
    private breakpointService: NbMediaBreakpointsService,
    private iconLibraries: NbIconLibraries
  ) {
    this.iconLibraries.registerFontPack('ionicons');

    this.iconLibraries.registerFontPack('ion', { packClass: 'ion', iconClassPrefix: 'ion-' });

    this.iconLibraries.registerSvgPack('rapisurv-icons', {
      'users': `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.208122in" height="0.198512in" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
      viewBox="0 0 226.94 216.46"
       xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <g id="_2740272646400">
         <g id="Iconly_x002f_Light_x002f_2-User">
          <g id="_2-User">
           <path id="Stroke-1" fill="none" stroke="#F85C04" stroke-width="17.04" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M86.24 144.33c41.89,0 77.71,6.35 77.71,31.71 0,25.36 -35.57,31.89 -77.71,31.89 -41.92,0 -77.72,-6.29 -77.72,-31.66 0,-25.38 35.56,-31.94 77.72,-31.94z"/>
           <path id="Stroke-3" fill="none" stroke="#F85C04" stroke-width="17.04" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M86.24 108.14c-27.51,0 -49.82,-22.29 -49.82,-49.81 0,-27.51 22.31,-49.81 49.82,-49.81 27.49,0 49.8,22.3 49.8,49.81 0.1,27.41 -22.05,49.71 -49.45,49.81l-0.35 0z"/>
           <path id="Stroke-5" fill="none" stroke="#F85C04" stroke-width="17.04" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M164.51 95.21c18.18,-2.55 32.19,-18.16 32.22,-37.05 0,-18.61 -13.57,-34.06 -31.37,-36.98"/>
           <path id="Stroke-7" fill="none" stroke="#F85C04" stroke-width="17.04" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M188.5 138.94c17.62,2.62 29.92,8.8 29.92,21.52 0,8.76 -5.79,14.44 -15.15,17.99"/>
          </g>
         </g>
        </g>
       </g>
      </svg>
      `,
      'rp-prices': `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve"  width="0.226799in" height="0.194906in" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
      viewBox="0 0 1146.66 769.72"
       xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <g id="_2740345871776">
         <polygon fill="white" points="149.87,265.73 256.28,653.58 1127.21,421.15 1022.19,19.29 "/>
         <g>
          <path fill="#F85C04" d="M365.66 410.56c2.68,9.98 -3.25,20.24 -13.23,22.92 -9.98,2.67 -20.24,-3.25 -22.91,-13.23 -2.67,-9.98 3.25,-20.24 13.23,-22.91 9.98,-2.68 20.24,3.25 22.91,13.22z"/>
          <path fill="#F85C04" d="M943.97 255.61c2.67,9.98 -3.25,20.24 -13.23,22.91 -9.98,2.68 -20.24,-3.25 -22.91,-13.23 -2.68,-9.98 3.25,-20.24 13.23,-22.91 9.98,-2.67 20.24,3.25 22.91,13.23z"/>
          <path fill="#F85C04" d="M598.52 193.21l-291.18 78.02c4.52,47.39 -21.76,92.88 -65.05,112.67l29.86 111.45c47.39,-4.52 92.88,21.76 112.67,65.05l291.18 -78.02 -77.49 -289.17zm-236.4 276.42c-29.89,8.01 -60.74,-9.8 -68.74,-39.69 -8.01,-29.89 9.8,-60.74 39.69,-68.74 29.89,-8.01 60.74,9.8 68.74,39.69 8.01,29.89 -9.8,60.73 -39.69,68.74z"/>
          <path fill="#F85C04" d="M126.82 242.12l116.22 433.74 903.62 -242.12 -116.22 -433.74 -903.62 242.12zm45.83 26.46l36.14 -9.68 9.68 36.14 -36.14 9.68 -9.68 -36.14zm133 351.76l-36.14 9.69 -9.68 -36.14 36.14 -9.68 9.68 36.14zm795.18 -213.06l-36.14 9.68 -9.68 -36.14 36.14 -9.68 9.68 36.14zm-29.05 -108.43c2.67,9.97 -3.26,20.24 -13.23,22.91 -39.87,10.68 -63.61,51.79 -52.92,91.66 2.67,9.97 -3.26,20.24 -13.23,22.91l-614.46 164.64c-9.97,2.67 -20.24,-3.25 -22.91,-13.23 -10.68,-39.86 -51.79,-63.6 -91.66,-52.92 -9.97,2.67 -20.24,-3.26 -22.91,-13.23l-38.74 -144.58c-2.67,-9.97 3.25,-20.24 13.22,-22.91 39.87,-10.68 63.61,-51.79 52.92,-91.66 -2.67,-9.97 3.26,-20.24 13.23,-22.91l614.46 -164.64c9.97,-2.67 20.24,3.25 22.91,13.22 10.68,39.87 51.79,63.61 91.66,52.92 9.97,-2.67 20.24,3.26 22.91,13.23l38.74 144.58zm-58.11 -216.87l-36.14 9.68 -9.68 -36.14 36.14 -9.68 9.68 36.14z"/>
          <path fill="#F85C04" d="M890.88 114.88l-295.48 79.17 77.48 289.16 295.48 -79.17c-4.36,-47.43 22.72,-93.14 67.01,-113.2l-29.86 -111.45c-48.39,4.79 -94.67,-21.26 -114.63,-64.51l-0.01 0zm92.62 130.14c8.01,29.89 -10.34,60.87 -40.89,69.06 -30.55,8.19 -61.93,-9.47 -69.95,-39.37 -8.01,-29.89 10.34,-60.87 40.89,-69.06 30.55,-8.19 61.93,9.47 69.94,39.37z"/>
         </g>
        </g>
        <rect fill="white" x="14.52" y="333.85" width="904.53" height="427.06" rx="13.44" ry="13.44"/>
        <g id="_2740345873024">
         <path fill="#F85C04" d="M187.1 545.2c0,10.33 -8.38,18.71 -18.71,18.71 -10.33,0 -18.71,-8.38 -18.71,-18.71 0,-10.33 8.38,-18.71 18.71,-18.71 10.33,0 18.71,8.38 18.71,18.71z"/>
         <path fill="#F85C04" d="M785.82 545.2c0,10.33 -8.38,18.71 -18.71,18.71 -10.33,0 -18.71,-8.38 -18.71,-18.71 0,-10.33 8.38,-18.71 18.71,-18.71 10.33,0 18.71,8.38 18.71,18.71z"/>
         <path fill="#F85C04" d="M468.28 395.52l-301.45 0c-7.89,46.94 -45.05,84.09 -91.99,92l0 115.38c46.94,7.89 84.08,45.05 91.99,91.99l301.45 0 0 -299.37zm-299.89 205.81c-30.95,0 -56.13,-25.18 -56.13,-56.13 0,-30.95 25.18,-56.13 56.13,-56.13 30.95,0 56.13,25.18 56.13,56.13 0,30.95 -25.18,56.13 -56.13,56.13z"/>
         <path fill="#F85C04" d="M-0 320.68l0 449.03 935.49 0 0 -449.03 -935.49 0zm37.42 37.42l37.42 0 0 37.41 -37.42 0 0 -37.41zm37.42 374.19l-37.42 0 0 -37.42 37.42 0 0 37.42zm823.23 0l-37.42 0 0 -37.42 37.42 0 0 37.42zm0 -112.26c0,10.32 -8.39,18.71 -18.71,18.71 -41.27,0 -74.84,33.57 -74.84,74.84 0,10.32 -8.39,18.71 -18.71,18.71l-636.13 0c-10.32,0 -18.71,-8.38 -18.71,-18.71 0,-41.27 -33.57,-74.84 -74.84,-74.84 -10.32,0 -18.71,-8.38 -18.71,-18.71l0 -149.68c0,-10.32 8.39,-18.71 18.71,-18.71 41.27,0 74.84,-33.57 74.84,-74.84 0,-10.32 8.39,-18.71 18.71,-18.71l636.13 0c10.32,0 18.71,8.38 18.71,18.71 0,41.27 33.57,74.84 74.84,74.84 10.32,0 18.71,8.38 18.71,18.71l0 149.68zm0 -224.52l-37.42 0 0 -37.41 37.42 0 0 37.41z"/>
         <path fill="#F85C04" d="M770.96 395.52l-305.91 0 0 299.36 305.91 0c8.07,-46.94 46.05,-84.09 94.03,-92l0 -115.38c-47.98,-7.89 -85.94,-45.04 -94.03,-91.98l0 -0.01zm55.78 149.68c0,30.95 -25.74,56.13 -57.37,56.13 -31.63,0 -57.37,-25.18 -57.37,-56.13 0,-30.95 25.74,-56.13 57.37,-56.13 31.63,0 57.37,25.18 57.37,56.13z"/>
        </g>
       </g>
      </svg>
      `,
      'teams': `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.226799in" height="0.174906in" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
      viewBox="0 0 259.63 200.23"
       xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <g id="_2776417740048">
         <g id="Iconly_x002f_Light_x002f_3-User">
          <g id="_3-User">
           <path id="Stroke-1" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M201.38 88.21c16.64,-2.34 29.44,-16.6 29.48,-33.88 0,-17.03 -12.41,-31.15 -28.69,-33.82"/>
           <path id="Stroke-3" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M223.33 128.19c16.11,2.41 27.36,8.05 27.36,19.68 0,8 -5.3,13.2 -13.86,16.46"/>
           <path id="Stroke-5" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M129.82 133.12c-38.32,0 -71.05,5.8 -71.05,29 0,23.18 32.53,29.16 71.05,29.16 38.33,0 71.05,-5.75 71.05,-28.95 0,-23.21 -32.52,-29.21 -71.05,-29.21z"/>
           <path id="Stroke-7" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M129.82 100.02c25.15,0 45.54,-20.38 45.54,-45.54 0,-25.15 -20.39,-45.54 -45.54,-45.54 -25.15,0 -45.53,20.39 -45.53,45.54 -0.09,25.07 20.14,45.46 45.2,45.54l0.33 0z"/>
           <path id="Stroke-9" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M58.25 88.21c-16.64,-2.34 -29.44,-16.6 -29.48,-33.88 0,-17.03 12.41,-31.15 28.69,-33.82"/>
           <path id="Stroke-11" fill="none" stroke="#F85C04" stroke-width="17.89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M36.3 128.19c-16.11,2.41 -27.35,8.05 -27.35,19.68 0,8 5.3,13.2 13.85,16.46"/>
          </g>
         </g>
        </g>
       </g>
      </svg>
      `,
      'rp-subscription': `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="0.223961in" height="0.223961in" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
      viewBox="0 0 64.41 26.42"
       xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <g id="_2740264134944">
         <g id="Iconly_x002f_Light_x002f_Setting">
          <g id="Setting">
           <path id="Path_33946" fill="none" stroke="#F85C04" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" d="M63.45 9.88l-0.68 -1.17c-0.57,-0.99 -1.84,-1.33 -2.83,-0.77l0 0c-0.47,0.28 -1.04,0.36 -1.57,0.22 -0.53,-0.14 -0.99,-0.48 -1.26,-0.96 -0.18,-0.3 -0.27,-0.64 -0.28,-0.99l0 0c0.02,-0.56 -0.2,-1.11 -0.59,-1.51 -0.39,-0.4 -0.93,-0.63 -1.49,-0.63l-1.36 0c-0.55,0 -1.08,0.22 -1.47,0.61 -0.39,0.39 -0.61,0.92 -0.6,1.47l0 0c-0.02,1.14 -0.94,2.05 -2.08,2.05 -0.35,-0 -0.69,-0.1 -0.99,-0.28l0 0c-0.99,-0.57 -2.26,-0.23 -2.83,0.77l-0.73 1.19c-0.57,0.99 -0.23,2.26 0.76,2.83l0 0c0.64,0.37 1.04,1.06 1.04,1.8 0,0.74 -0.4,1.43 -1.04,1.8l0 0c-0.99,0.57 -1.33,1.83 -0.76,2.82l0 0 0.69 1.18c0.27,0.48 0.72,0.84 1.25,0.99 0.53,0.15 1.1,0.08 1.58,-0.19l0 0c0.47,-0.28 1.04,-0.35 1.57,-0.21 0.53,0.14 0.98,0.49 1.25,0.97 0.18,0.3 0.27,0.64 0.28,0.99l0 0c0,1.15 0.93,2.08 2.08,2.08l1.36 0c1.14,0 2.07,-0.92 2.08,-2.07l0 0c-0,-0.55 0.22,-1.08 0.61,-1.47 0.39,-0.39 0.92,-0.61 1.47,-0.61 0.35,0.01 0.69,0.1 0.99,0.28l0 0c0.99,0.57 2.26,0.23 2.83,-0.76l0 0 0.72 -1.19c0.28,-0.48 0.35,-1.04 0.21,-1.57 -0.14,-0.53 -0.49,-0.99 -0.97,-1.26l0 0c-0.48,-0.27 -0.83,-0.73 -0.97,-1.26 -0.14,-0.53 -0.07,-1.1 0.21,-1.57 0.18,-0.31 0.44,-0.57 0.76,-0.76l0 0c0.98,-0.57 1.32,-1.83 0.76,-2.82l0 0 0 -0.01z"/>
           <circle id="Ellipse_737" fill="none" stroke="#F85C04" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" cx="54.08" cy="14.52" r="2.86"/>
          </g>
         </g>
        </g>
        <path fill="none" stroke="#F85C04" stroke-width="0.9" stroke-miterlimit="2.61313" d="M45.84 25.97l-29.87 0c-1.55,0 -2.83,-1.27 -2.83,-2.83l0 -19.86c0,-1.56 1.27,-2.83 2.83,-2.83l33.3 0c0.98,0 1.85,0.51 2.36,1.27"/>
        <path fill="#F85C04" d="M13.88 4.39l30.25 0c0.48,0 0.83,0.04 1.07,0.04 1.25,-0.01 -0.2,0.39 -0.6,0.65 -1.11,0.71 -2.91,2.56 -3.72,3.94 -0.36,0.62 -0.6,1.09 -0.74,1.07 -0.25,-0.02 -0.66,-0.04 -1.29,-0.04l-24.97 0c-0.51,0 -0.93,-0.42 -0.93,-0.93l0 -3.8c0,-0.51 0.42,-0.93 0.93,-0.93z"/>
        <g id="_2740264337184">
         <g id="Iconly_x002f_Light_x002f_Arrow---Up">
          <g id="Arrow---Up">
           <line id="Stroke-1" fill="none" stroke="#F85C04" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" x1="4.21" y1="7.7" x2="4.21" y2= "17.06" />
           <polyline id="Stroke-3" fill="none" stroke="#F85C04" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.61313" points="0.45,11.48 4.21,7.7 7.97,11.48 "/>
          </g>
         </g>
        </g>
       </g>
      </svg>
      `,
      'collaborate': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><path d="M336,264.13V436c0,24.3-19.05,44-42.95,44H107C83.05,480,64,460.3,64,436V172a44.26,44.26,0,0,1,44-44h94.12a24.55,24.55,0,0,1,17.49,7.36l109.15,111A25.4,25.4,0,0,1,336,264.13Z" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/><path d="M200,128V236a28.34,28.34,0,0,0,28,28H336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M176,128V76a44.26,44.26,0,0,1,44-44h94a24.83,24.83,0,0,1,17.61,7.36l109.15,111A25.09,25.09,0,0,1,448,168V340c0,24.3-19.05,44-42.95,44H344" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/><path d="M312,32V140a28.34,28.34,0,0,0,28,28H448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'rp-dashboard': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in"  viewBox="0 0 512 512"><path d="M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 179 400 64 352 64 352 133" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'grid-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><rect x="48" y="48" width="176" height="176" rx="20" ry="20" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><rect x="288" y="48" width="176" height="176" rx="20" ry="20" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><rect x="48" y="288" width="176" height="176" rx="20" ry="20" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><rect x="288" y="288" width="176" height="176" rx="20" ry="20" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'briefcase-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><rect x="32" y="128" width="448" height="320" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/><path d="M144,128V96a32,32,0,0,1,32-32H336a32,32,0,0,1,32,32v32" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="480" y1="240" x2="32" y2="240" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M320,240v24a8,8,0,0,1-8,8H200a8,8,0,0,1-8-8V240" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'file-tray-full-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><path d="M384,80H128c-26,0-43,14-48,40L48,272V384a48.14,48.14,0,0,0,48,48H416a48.14,48.14,0,0,0,48-48V272L432,120C427,93,409,80,384,80Z" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/><line x1="48" y1="272" x2="192" y2="272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="320" y1="272" x2="464" y2="272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M192,272a64,64,0,0,0,128,0" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="144" y1="144" x2="368" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="128" y1="208" x2="384" y2="208" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'alert-circle-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><path d="M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z"/></svg>`,
      'mail-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="40" ry="40" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 160 256 272 400 160" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'settings-outline': `<svg xmlns="http://www.w3.org/2000/svg" width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><path d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      'wallet-outline': `<svg xmlns="http://www.w3.org/2000/svg"  width="0.223961in" height="0.223961in" viewBox="0 0 512 512"><rect x="48" y="144" width="416" height="288" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"/></svg>`
    });

  }



  ngOnInit() {
    this.username = this.storageService.getItem('username',
      { target: EStorageTarget.LocalStorage ? EStorageTarget.LocalStorage : EStorageTarget.SessionStorage })

    const _userData =
      this.storageService.getItem(STORAGE_KEY_USER_DATA, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_USER_DATA, {
        target: EStorageTarget.SessionStorage,
      });
    let role = _userData.roles.find(n => n.name === 'collaborator');
    if (role && !_userData.license) {
      this.menu = COLLAB_MENU_ITEMS;
    } else {
      this.menu = MENU_ITEMS;
    }
  }
}
