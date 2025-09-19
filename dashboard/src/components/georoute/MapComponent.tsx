import React, { useEffect, useRef } from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent, Group, Inject, Page, Sort, Filter } from '@syncfusion/ej2-react-grids';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus, faPencil, faTrashCan, faPlay, faUpload, faStop } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

// Fix for default Leaflet icon not showing up in React
// This is a common issue with bundlers like Webpack
// For more robust solutions, consider using a plugin or a different approach
// but this is a simple fix for a self-contained component.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
    center: [number, number];
    zoom: number;
}

const MapComponent: React.FC<MapProps> = ({ center, zoom }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            // Initialize the map if it hasn't been created yet
            mapInstance.current = L.map(mapRef.current).setView(center, zoom);

            // Add a tile layer from OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);
        }
    }, [center, zoom]);

    useEffect(() => {
        // Clean up the map instance on component unmount
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    const addressData: Object[] = [
        { "Name": "Eric Watt", "Address": "11700 Commonwealth DR", "City": "Louisville", "State": "KY", "Zip": 40299 },
        { "Name": "Renate Leeper", "Address": "843 Albert Ave", "City": "Corydon", "State": "IN", "Zip": 47112 },
        { "Name": "Karl Williams", "Address": "497 Cedar Flats RD", "City": "Battletown", "State": "KY", "Zip": 40104 },
        { "Name": "Beki Swisher", "Address": "846 Colonial Way", "City": "Franklin", "State": "IN", "Zip": 46131 },
        { "Name": "Speedway", "Address": "1830 Blankenbaker PKWY", "City": "Louisville", "State": "KY", "Zip": 40299 }
    ];

    return (
        <>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="col-span-1">
                    <div
                        className="rounded-3xl"
                        ref={mapRef}
                        style={{ width: '100%', height: '650px' }} // Set a fixed size for the map container
                    />
                </div>
                <div className="col-span-1">
                    <div className="flex items-center p-4 mb-3 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-100 dark:text-blue-800" role="alert">
                        <span className="sr-only">Info</span>
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-3" />
                        <div id="messageBox">
                            <span className="font-medium">Info: </span>Add or import up to 5 desination addresses and click Start.
                        </div>
                    </div>
                    <GridComponent className="mb-3" id="addressList" dataSource={addressData} allowPaging={true} allowSorting={true} allowExcelExport={true} allowPdfExport={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='Name' textAlign='Left' width='100' />
                            <ColumnDirective field='Address' textAlign='Left' width='200' />
                            <ColumnDirective field='City' textAlign='Left' width='100' />
                            <ColumnDirective field='State' textAlign='Left' width='90' />
                            <ColumnDirective field='Zip' textAlign='Right' width='90' />
                        </ColumnsDirective>
                        <Inject services={[Page, Sort, Filter, Group]} />
                    </GridComponent>
                    <div className="flex justify-center mb-3">
                        <Button label='' icon={faPlus} color='Information' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Add button clicked' } />
                        <Button label='' icon={faPencil} color='Information' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Edit button clicked' } />
                        <Button label='' icon={faTrashCan} color='Information' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Delete button clicked' } />
                        <Button label='' icon={faUpload} color='Information' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Import button clicked' } />
                        <Button label='' icon={faPlay} color='Success' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Start button clicked'} />
                        <Button label='' icon={faStop} color='Danger' onClick={() => document.getElementById('messageBox')!.innerHTML = 'Info: Reset button clicked' } />
                    </div>
                    <div className="text-center">
                        <div role="status" className="invisible">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                            <p className="text-sm text-blue-800 dark:text-blue-400 mx-3">Calculating optimal route...</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-6 mx-10">
                        <div id="distanceBox" className="flex h-30 text-blue-400 bg-gray-100 rounded-3xl justify-center items-center">
                            <p className="text-2xl">0 Miles</p>
                        </div>
                        <div id="durationBox" className="flex h-30 text-blue-400 bg-gray-100 rounded-3xl justify-center items-center">
                            <p className="text-2xl">0 Minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapComponent;