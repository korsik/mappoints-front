export const selectedMarkers=[];

export const addToMarkers = ({ marker }) => {
    console.log(selectedMarkers.length + " size");
    let found = false; // Use a boolean for clearer logic
  
    for (var i = 0; i < selectedMarkers.length; i++) {
      if (selectedMarkers[i].id === marker.id) { // Use === for comparison
        found = true;
        break; // Exit the loop once found
      }
    }
    
    if (!found) { // Only add if not found
      selectedMarkers.push(marker);
    }
  };

export const getSelected=()=>{
   return selectedMarkers;
}

export const getSelectedHeadersExtra=()=>{

    const data = selectedMarkers[0].data
 
      return JSON.parse(data);;
 }


 export const getSelectedDataExtra=({row})=>{
    console.log("js");  
    console.log(row);
    const data = row
     
      return JSON.parse(data);;
 }