import { onCleanup, createEffect, Component, ParentComponent } from 'solid-js';
import { useMap } from 'solid-map-gl';
import mapboxgl from 'mapbox-gl';
import { Atom } from 'solid-use';

const Marker: ParentComponent<{lngLat: any, options:any, onClick?: ()=>void}> = (props) => {
    const map = useMap();
    let marker: mapboxgl.Marker | null = null;
    // Add Marker
    createEffect(() => {
        marker = new mapboxgl.Marker(props.options)
            .setLngLat(props.lngLat)
            .setPopup(props.children
            ? new mapboxgl.Popup().setDOMContent(<div>{props.children}</div> as Node)
            : undefined)
            .addTo(map());

        marker.getElement().addEventListener('click', () => { props.onClick?.();});

    // Remove Marker
    onCleanup(() => marker!!.remove());
    // Update Position
    createEffect(() => marker && marker.setLngLat(props.lngLat));
            })

    return <></>;
}


export default Marker;