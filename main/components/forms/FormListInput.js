import { useFormikContext } from "formik";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import AppFormField from "./FormField";


function FormListInput({ name, itemProps, buttonTitle='ADD NEW ITEM ' }) {
  const { values, setFieldValue } = useFormikContext();

  const addNewItem = () => {
    const newItem = {};
    Object.keys(itemProps).forEach((prop) => {
      newItem[prop] = itemProps[prop].initialValue || "";
    });
    const updatedList = [...values[name], newItem];
    setFieldValue(name, updatedList);
  };

  const removeItem = (index) => {
    const updatedList = values[name].filter((_, i) => i !== index);
    setFieldValue(name, updatedList);
  };

  return (
    <View>
      <Text style={styles.label}>{itemProps.label || "Items List"}</Text>
      {values[name].map((item, index) => (
        <View key={index}>
          <View style={styles.itemContainer}>
            <View style={styles.formFieldsContainer}>
              {Object.keys(itemProps).map((prop) => (
                <AppFormField
                  key={prop}
                  name={`${name}[${index}].${prop}`}
                  placeholder={itemProps[prop].placeholder || prop}
                  // You can customize this input as needed
                />
              ))}
            </View>
<Button onPress={() => removeItem(index)} title='Remove' color={colors.bootstrap_danger}  />
          
          </View>
        </View>
      ))}
      <Button title={buttonTitle} color={colors.bootstrap_success} onPress={addNewItem} style={styles.addButton} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: "column", // Change to column layout
    marginBottom: 20, // Add margin between each item
  },
  formFieldsContainer: {
    marginBottom: 10, // Apply margin to the form fields
  },
  addButton: {
    color: colors.primary,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: colors.danger,
  },
});

export default FormListInput;
