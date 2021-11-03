import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google

@Component({
  selector: 'app-pop-up-maps',
  templateUrl: './pop-up-maps.component.html',
  styleUrls: ['./pop-up-maps.component.scss'],
})
export class PopUpMapsComponent implements OnInit {
  result:string=''
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  labelIndex = 0
  markers = []
  map:any

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.map = null
    this.initMap()

    document.getElementById('contenedor').setAttribute("style","height:0%;width:0%");
    setTimeout(() => {
      document.getElementById('contenedor').setAttribute("style","height:100%;width:100%");
    }, 500);
  }

  initMap() {
    let obj=this
    let element = document.getElementById("mapa")
    element.innerHTML = ''

    this.map = new google.maps.Map(element, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16
    });
    google.maps.event.addListener(this.map, 'resize', function() {
      obj.map.setCenter({ lat: -34.397, lng: 150.644 });
      obj.map.setZoom(10);
    });

    let infoWindow = new google.maps.InfoWindow({ map: this.map });
    let geocoder = new google.maps.Geocoder();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Mi ubicación');
            obj.map.setCenter(pos);
            obj.geocodeLatLng(geocoder, obj.map, infoWindow, pos.lat, pos.lng);

        }, function () {
          obj.handleLocationError(true, infoWindow, obj.map.getCenter());
        });
    } else {
        this.handleLocationError(false, infoWindow, obj.map.getCenter());
    }
    
    google.maps.event.addListener(obj.map, 'click', function (event) {
      obj.addMarker(geocoder, event.latLng, obj.map);
      obj.setMapOnAll(obj.map);
    });
    
  }

  geocodeLatLng(geocoder, map, infowindow, lat, lng) {
    let obj=this
    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
      
        if (status === 'OK') {
            var resultadoFinal = results[0];
            if (resultadoFinal != null) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: "assets/pinUser.png"
                });
                console.log("resultadoFinal: ", resultadoFinal)
                if (resultadoFinal.formatted_address != undefined && resultadoFinal.formatted_address != null) {
                      obj.result = resultadoFinal.formatted_address;
                }
            } else {
                console.log('No results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

  addMarker(geocoder, location, map) {
    var marker = new google.maps.Marker({
        position: location,
        // label: this.labels[this.labelIndex++ % this.labels.length],
        map: map,
        icon: "assets/pinUser.png"
    });
    this.getAddress(geocoder,location);
    this.markers = []; //de prueba
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
    }
  }

  getAddress(geocoder,latLng) {
    let obj = this
    geocoder.geocode({ 'latLng': latLng },
      function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                obj.result = results[0].formatted_address;
              }
              else {
                obj.result = "No results";
              }
          }
          else {
            obj.result = status;
          }
      });
  }

  async closePop() {
    await this.modalController.dismiss(null);
  }

  async aceptar(){
    console.log("result: ", this.result);
    document.getElementById('contenedor').innerHTML = '';
    await this.modalController.dismiss(this.result);
  }

}
