import { useState } from "react";

//:[number,() => void, () => void] is implicit and not needed in this case, it's just typed out to show how it works
const useCount = (initialState = 0):[number,() => void, () => void] => {
    
    const [value, setValue] = useState(initialState);

    const add = () => {
        setValue((value) => value+1);
    }

    const substract = () => {
        setValue((value) => value-1);
    }
    
    return [value,add,substract];
}

export default useCount;