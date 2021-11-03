import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Utilities } from 'src/Utils/Utilities';

// import the service
import { SalesService } from "src/app/services/Sales/sales.service";

declare var google

@Component({
  selector: 'app-pop-up-track-order',
  templateUrl: './pop-up-track-order.component.html',
  styleUrls: ['./pop-up-track-order.component.scss'],
})
export class PopUpTrackOrderComponent implements OnInit {
  @ViewChild('viewTimeDuration') viewTimeDuration: ElementRef;
  @ViewChild('mapa') mapa: ElementRef;
  result: string = '';
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;
  markers = [];
  map: any;
  addressDestination: string = '';
  addressOrigin: string = '';
  timeDuration: string = 'Sin calular';
  orderDetail: any[] = [];
  total: string = '0';
  show: boolean = true;
  loaded: boolean = true;
  loading: string[] = ['Uno', 'Dos', 'Tres'];
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private salesService: SalesService,
    public utils: Utilities
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.addressDestination = this.navParams.data.addressDestination;
    const idSale = this.navParams.data.idSale;
    await this.getOrderDetail(idSale);
    this.map = null;
    this.mapa.nativeElement.style.display = 'none';
    this.initMap();
    // document
    //   .getElementById('contenedor')
    //   .setAttribute('style', 'height:0%;width:0%');
    setTimeout(() => {
      document
        .getElementById('contenedor')
        .setAttribute('style', 'height:100%;width:100%');
      this.mapa.nativeElement.style.display = 'block';
      this.show = false;
    }, 600);
  }

  initMap() {
    let obj = this;
    let element = document.getElementById('mapa');
    element.innerHTML = '';

    this.map = new google.maps.Map(element, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 400,
    });
    google.maps.event.addListener(this.map, 'resize', function () {
      obj.map.setCenter({ lat: -34.397, lng: 150.644 });
      obj.map.setZoom(400);
    });

    let infoWindow = new google.maps.InfoWindow({ map: this.map });
    let geocoder = new google.maps.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          //infoWindow.setContent('Mi ubicación');
          obj.map.setCenter(pos);
          obj.geocodeLatLng(geocoder, obj.map, infoWindow, pos.lat, pos.lng);
        },
        function () {
          obj.handleLocationError(true, infoWindow, obj.map.getCenter());
        }
      );
    } else {
      this.handleLocationError(false, infoWindow, obj.map.getCenter());
    }

    google.maps.event.addListener(obj.map, 'click', function (event) {
      //obj.addMarker(geocoder, event.latLng, obj.map);
      obj.setMapOnAll(obj.map);
    });
  }

  geocodeLatLng(geocoder, map, infowindow, lat, lng) {
    let obj = this;
    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === 'OK') {
        var resultadoFinal = results[0];
        if (resultadoFinal != null) {
          map.setZoom(11);
          // var marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map,
          //   icon: 'assets/pinUser.png',
          // });
          console.log('resultadoFinal: ', resultadoFinal);
          if (
            resultadoFinal.formatted_address != undefined &&
            resultadoFinal.formatted_address != null
          ) {
            obj.result = resultadoFinal.formatted_address;
            obj.addressOrigin = resultadoFinal.formatted_address;
            console.log('Address origin : ', resultadoFinal.formatted_address);
            console.warn('Direccion actual de origen -> ', obj.addressOrigin);
            console.warn(
              'Direccion actual de destino -> ',
              obj.addressDestination
            );
            // obj.drawRouteDirection(
            //   resultadoFinal.formatted_address,
            //   obj.addressDestination
            // );
            // obj.getDurationADestination(
            //   obj.addressOrigin,
            //   obj.addressDestination
            // );
          }
        } else {
          console.log('No results found');
          obj.addressOrigin = null;
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
        obj.addressOrigin = null;
      }
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
  }

  addMarker(geocoder, location, map) {
    var marker = new google.maps.Marker({
      position: location,
      // label: this.labels[this.labelIndex++ % this.labels.length],
      map: map,
      icon: 'assets/pinUser.png',
    });
    this.getAddress(geocoder, location);
    this.markers = []; //de prueba
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  getAddress(geocoder, latLng) {
    let obj = this;
    geocoder.geocode({ latLng: latLng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          obj.result = results[0].formatted_address;
        } else {
          obj.result = 'No results';
        }
      } else {
        obj.result = status;
      }
      return obj.result;
    });
  }

  drawRouteDirection(origin: string, destination: string) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  getDurationADestination(addressOrigin: string, addressDestination: string) {
    var _this = this;
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [addressOrigin],
        destinations: [addressDestination],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false,
      },
      function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          console.log('Error:', status);
        } else {
          console.log(response);
          _this.timeDuration = response.rows[0].elements[0].duration.text;
          console.warn('Tiempo actual de dirección -> ', _this.timeDuration);
          _this.viewTimeDuration.nativeElement.textContent = _this.timeDuration;
          // $('#distance')
          //   .text(response.rows[0].elements[0].distance.text)
          //   .show();
          // $('#duration')
          //   .text(response.rows[0].elements[0].duration.text)
          //   .show();
        }
      }
    );
  }

  drawPolygon() {
    //  Coordenada de la ruta (desde Misiones hasta Tierra del Fuego)
    // var polygoneCoords = [
    //   { lat: 3.4196462, lng: -76.5123178 },
    //   { lat: 3.4190465, lng: -76.5076293 },
    // ];
    // var myPolygon = new google.maps.Polygon({
    //   paths: polygoneCoords,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35,
    // });
    // myPolygon.setMap(obj.map);
  }

  async closePop() {
    await this.modalController.dismiss(null);
  }

  async aceptar() {
    console.log('result: ', this.result);
    document.getElementById('contenedor').innerHTML = '';
    await this.modalController.dismiss(this.result);
  }

  async getOrderDetail(idSale: number) {
    try {     
      const requestODetail = await this.salesService.getOrderDetail({
        idSale: idSale,
      });
      const responseRODetail = await requestODetail.json();
      if (!responseRODetail.message) {
        this.orderDetail = responseRODetail;
        this.loaded = false;
        var orderTotal = 0;
        for (let i = 0; i < this.orderDetail.length; i++) {
          orderTotal += parseInt(this.orderDetail[i].amountSale);
        }
        this.total = orderTotal.toString();
      }
    } catch (error) {
    }
  }
}
