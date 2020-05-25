import React from "react";

export const AddSVG = ({color = "#fff", classes = ""}) => {
     return(
         <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61">
             <g id="Group_140" data-name="Group 140" transform="translate(-911 -1267)">
                 <g id="Rectangle_39" data-name="Rectangle 39" transform="translate(911 1267)" fill="none" stroke={color} strokeWidth="2">
                     <rect width="61" height="61" stroke="none"/>
                     <rect x="1" y="1" width="59" height="59" fill="none"/>
                 </g>
                 <path id="Path_39" data-name="Path 39" d="M17.7-37.5V-24H4.38v3.6H17.7V-6.9h3.9V-20.4H34.98V-24H21.6V-37.5Z" transform="translate(922 1320)" fill={color}/>
             </g>
         </svg>
     )
}
