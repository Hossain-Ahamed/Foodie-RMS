import React from "react";
export  const MinusIcon = ({ size = 24, width, height, ...props }) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
        color="red"
    >
        <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M6 12h12" />

        </g>
    </svg>
);
