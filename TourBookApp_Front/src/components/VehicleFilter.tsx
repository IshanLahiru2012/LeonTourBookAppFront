import { Category, Check, ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material";
import { categoryList } from "../config/transfer-options-config";
import { ChangeEvent } from "react";

type Props ={
    onChange: (category: string[]) => void;
    selectedCategories: string[];
    isExpand : boolean;
    onExpandHandle : ()=> void;

}

const VehicleFilter = ({onChange, selectedCategories,isExpand,onExpandHandle}:Props) =>{

    const handleCategoryReset = ()=> onChange([]);

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const clickedCategory = event.target.value;
        const isChecked = event.target.checked;

        const newCategoryList = isChecked ? [...selectedCategories, clickedCategory] 
                                        : selectedCategories.filter((Category)=> Category !== clickedCategory);
        onChange(newCategoryList)
        console.log(newCategoryList)

    }

    return(
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-medium mb-2">Filter By Category</div>
                <div onClick={handleCategoryReset} 
                    className="text-sm font-medium mb-2 cursor-pointer text-blue-400 hover:underline">reset Filter</div>
            </div>
            <div className="space-y-2 flex flex-col items-center" >
                {categoryList.slice(0,isExpand? categoryList.length:5).map((category,index)=>{
                    const isSelected = selectedCategories.includes(category);
                    return(
                        <div className="flex w-[80%] " key={index} >
                            <input 
                                type="checkbox"
                                id={`category_${category}`}       
                                value={category}   
                                className="hidden"    
                                checked={isSelected}
                                onChange={handleCategoryChange}                  
                                />
                            <label htmlFor={`category_${category}`} 
                                className={`flex flex-1 rounded-full cursor-pointer text-sm items-center  px-4 py-1 font-medium 
                                            ${isSelected ? "border border-blue-500 text-blue-400"
                                            :"border border-pink-300" } ` }
                                
                                >
                                    {isSelected && <Check/>}
                                    {category}
                            </label>
                            
                        </div>
                    )
                })}
                <button
                    onClick={onExpandHandle}
                    className="mt-4 flex-1 text-sm"
                >
                    {isExpand ? (<span className="flex flex-row items-center text-blue-400">View Less <ExpandLess/></span>)
                    : <span className="flex flex-row items-center text-blue-400">View More <ExpandMore/></span>}

                </button>

            </div>
        </>
    )
}

export default VehicleFilter;