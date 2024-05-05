import React, { useState } from "react";
import { View } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} 
    from 'react-native-simple-radio-button';


function RadioButtons({data, itemData, type}) {

    const [selectedCondition, setSelectedCondition] = useState(0);
    itemData[type] = data[selectedCondition].label;

    return (
        <View>
            <RadioForm
                formHorizontal={false}
                animation={true}
                >
                {
                    data.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={selectedCondition === i}
                        onPress={(option) => {setSelectedCondition(option)
                                            itemData[type] = data[option].label}}
                        borderWidth={1}
                        buttonInnerColor={"#fc5c65"}
                        buttonOuterColor={selectedCondition === i ? "#fc5c65" : "#fc5c65"}
                        buttonSize={20}
                        buttonOuterSize={30}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        labelStyle={{fontSize: 20, color: "#fc5c65"}}
                        labelWrapStyle={{}}
                        />
                    </RadioButton>
                    ))
                }  
            </RadioForm>
        </View>
    )
}

export default RadioButtons;