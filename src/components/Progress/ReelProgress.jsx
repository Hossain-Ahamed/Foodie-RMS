import React from "react";
import { Progress, CircularProgress } from "@nextui-org/react";

export default function ReelProgress({value}) {
    // const [value, setValue] = React.useState(0);

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         setValue((v) => (v >= 100 ? 0 : v + 10));
    //     }, 500);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <CircularProgress
            aria-label="Downloading..."
            size="lg"
            value={value}
            color="success"
            showValueLabel={true}
            className="max-w-md"
        />
    );
}
