import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ModalController,
  NavParams,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import {  Router} from '@angular/router';
import jsQR from 'jsqr';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-pop-up-scan-qr',
  templateUrl: './pop-up-scan-qr.component.html',
  styleUrls: ['./pop-up-scan-qr.component.scss'],
})
export class PopUpScanQRComponent implements OnInit {
  scanActive: boolean = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  imagenMuestra = 'assets/animacionScanQR.gif';
  estaLogueado = false;
  loading: HTMLIonLoadingElement;

  qrScan: any;
  showExample: boolean;

  constructor(
    private _router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private androidPermissions: AndroidPermissions,
    private plt: Platform,
    private qrscanner: QRScanner,
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.plt.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName('body')[0].style.opacity = '1';
      this.qrScan.unsubscribe();
    });
  }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
    this.scanResult = null;
  }

  ionViewWillEnter() {
    this.scanResult = null;
  }

  subirImagen() {
    this.fileinput.nativeElement.click();
  }

  handleFile(event) {
    const file = event.target.files[0];
    var img = new Image();
    img.onload = async () => {
      this.canvasContext.drawImage(
        img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        this.scanResult = code.data;

        // var url = new URL(this.scanResult);
        // var par1 = url.searchParams.get("idElectrolinera");
        // var par2 = url.searchParams.get("idEstacion");
        // var par3 = url.searchParams.get('evse_id');
        // var par4 = url.searchParams.get('connector_id');

        console.log('ESCANEADO: ' + this.scanResult);
        if (this.navParams.data) {
          const requestInfoByQR = await this.navParams.data.requestInfo(
            this.scanResult
          );
        }
      }
    };
    //img.src = URL.createObjectURL(file);
  }

  async startScan() {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];

    if (this.plt.is('cordova') && isInStandaloneMode()) {
      this.escaneoCordova();
    } else if (this.plt.is('cordova')) {
      this.escaneoCordova();
    } else {
      this.escanearCodigo();
    }
  }

  async escanearCodigo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;

        //var url = new URL(this.scanResult);
        // var par3 = url.searchParams.get('evse_id');
        // var par4 = url.searchParams.get('connector_id');
        console.log('ESCANEADO: ' + this.scanResult);
        const requestInfoByQR = await this.navParams.data.requestInfo(
          this.scanResult
        );
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan() {
    this.scanActive = false;
    this.scanResult = null;
    this.qrscanner.hide();
  }

  reset() {
    this.scanResult = null;
    this.startScan();
  }

  escaneoCordova() {
    this.scanActive = false;
    this.qrscanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrscanner.show();
          document.getElementsByTagName('body')[0].style.opacity = '0';
          this.qrScan = this.qrscanner.scan().subscribe(
            (textoEscaneado) => {
              document.getElementsByTagName('body')[0].style.opacity = '1';
              this.qrscanner.hide();
              this.scanActive = false;
              this.qrScan.unsubscribe();
              this.scanResult = textoEscaneado;
              var url = new URL(this.scanResult);
              // var par3 = url.searchParams.get('evse_id');
              // var par4 = url.searchParams.get('connector_id');
              // this.navegar('/estaciones', par3, par4, true);
              alert('Escaneado: ' + url);
            },
            (e) => {
              alert('Error: ' + JSON.stringify(e));
            }
          );
        } else if (status.denied) {
          alert(
            'Para iniciar el escaneo debes habilitar los permisos de uso de tu cámara.'
          );
        } else {
          return;
        }
      })
      .catch((e) => {
        alert('Error: ' + JSON.stringify(e));
      });
  }

  async cerrar() {
    await this.modalController.dismiss(null);
  }

  showScanExample(decision: boolean) {}
}
