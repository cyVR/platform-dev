(function ($) {

  Drupal.behaviors.toolbox = {
    attach: attach
  };

  function attach(context, settings) {
    var lat = settings.nexteuropa_geojson.settings.fs_default_map_center['lat'];
    var lng = settings.nexteuropa_geojson.settings.fs_default_map_center['lng'];
    var map = L.map('geofield_geojson_map', {}).setView([lat, lng], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    drawnItems = L.featureGroup().addTo(map);

    // loaded GeoJSON map
    if(settings.nexteuropa_geojson.map) {
      loadedmap = jQuery.parseJSON(settings.nexteuropa_geojson.map);
      drawnItems = L.geoJson(loadedmap).addTo(map);

      i = 0;
      for(key in drawnItems._layers) {
        drawnItems._layers[key].bindPopup(drawnItems._layers[key].feature.properties.label);
        create_label(key, drawnItems._layers[key].feature.properties.label);
        i++;
      }
      map.fitBounds(drawnItems.getBounds());
    }

    var marker_setting = settings.nexteuropa_geojson.settings.fs_objects.objects['marker'] == 0 ? false : true;
    var polygon_setting = settings.nexteuropa_geojson.settings.fs_objects.objects['polygon'] == 0 ? false : true;
    var polyline_setting = settings.nexteuropa_geojson.settings.fs_objects.objects['polyline'] == 0 ? false : true;
    var rectangle_setting = settings.nexteuropa_geojson.settings.fs_objects.objects['rectangle'] == 0 ? false : true;  
 
    var drawControl = new L.Control.Draw({
      draw : {
        position : 'topleft',
        polygon : polygon_setting,
        polyline : polyline_setting,
        rectangle : rectangle_setting,
        marker: marker_setting,
        circle : false
      },
      edit: { featureGroup: drawnItems }
    });

    map.addControl(drawControl);

    var objects_count = 0;

    map.on('draw:created', function(e) {
if(objects_count < settings.nexteuropa_geojson.settings.fs_objects.objects_amount) {

      var type = e.layerType,
      layer = e.layer;

      var geoJSON = layer.toGeoJSON();
      feature = layer.feature;

      if (type === 'marker') {
      }

      if (type === 'polygon') {
      }
    
      //layer.bindPopup('<h1>Blank popup</h1>');

      console.log(objects_count);
      
        objects_count++;

      drawnItems.addLayer(layer);
      create_label(layer._leaflet_id, "");

      // update GeoJSON field
      geojson_map = drawnItems.toGeoJSON();
      $('.field-type-geofield-geojson textarea').text(JSON.stringify(geojson_map));
}

    });



map.on('draw:deleted', function (e) {
    var layers = e.layers._layers;
    var leaflet_id = Object.keys(layers)[0];
    $('#label_wrapper_'+leaflet_id).remove();
    objects_count--;
 });



function create_label(leaflet_id, content) {
  var myinput = '<div id="label_wrapper_'+leaflet_id+'" class="leaflet_label_wrapper"><input class="leaflet_label" name="myField" type="text" id="L'+leaflet_id+'">';
  myinput = myinput + '<a data-label-id="'+leaflet_id+'" class="remove-label" title="Delete labels."><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div>';

  $('#geofield_geojson_map_wrapper').append(myinput);

 $('#L'+leaflet_id).val(content);

 $('#L'+leaflet_id).change(function() {
   layer = map._layers[leaflet_id];
   
   layer.bindPopup($("#L"+leaflet_id).val());
   layer._popup.setContent($("#L"+leaflet_id).val())
   layer._popup.update();
   layer.openPopup();

   // update GeoJSON field
   geojson_map = drawnItems.toGeoJSON();
   i = 0
   for(key in drawnItems._layers) {
     geojson_map.features[i].properties.label = drawnItems._layers[key]._popup.getContent(); 
     i++;
   }
   $('.field-type-geofield-geojson textarea').text(JSON.stringify(geojson_map));
 });

 $('#L'+leaflet_id).focus(function() {
   layer = map._layers[leaflet_id];
   console.log(layer);
   //layer.setOpacity(1);
   //layer.togglePopup();
   layer.openPopup();

   if(layer._latlngs)
     map.setView(layer._latlngs[0]);
   else
     map.setView(layer.getLatLng());
   layer.setStyle({color:'#00FF33'});
   //layer.setStyle({fillcolor:'#00FF33'});
 });

 $('#L'+leaflet_id).blur(function() {
   layer = map._layers[leaflet_id];
   //layer.setOpacity(1);
   //layer.togglePopup();
   layer.closePopup();
   layer.setStyle({color:'#f06eaa'});
   //layer.setOpacity(0.5);
 }); 

 $('.remove-label').click(function() {
   layer = map._layers[$(this).attr('data-label-id')];
   layer.closePopup();
   layer.unbindPopup();
   //$('#label_wrapper_'+leaflet_id).remove();
   $('#L'+leaflet_id).val('');
 });

}


} 


})(jQuery);

