import {reduce}from 'lodash';
function verifTabOrder(tab,e){
const exist = reduce(tab,(item,key)=>{
    if (item.num_order===e)
        {return false;}
    
},true);
return exist;
}
export  {verifTabOrder}