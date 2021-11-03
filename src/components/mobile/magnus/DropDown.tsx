import React from "react";
import {
  Dropdown as DropdownM,
  Div,
  DropdownRef,
  Icon,
} from "react-native-magnus";
import { Pressable } from "react-native";
import { DropdownOptionProps } from "react-native-magnus/lib/typescript/src/ui/dropdown/dropdown.option.type";
import Text from "../Texts/index";

const dummyOptions = [
  {
    value: "1",
    displayedValue: "option 1",
  },
  {
    value: "2",
    displayedValue: "option 2",
  },
];
const DropDown = ({
  title = "Select an option",
  selectedValue,
  options = dummyOptions,
  onSelect,
}: {
  title: string;
  selectedValue: string;
  options: { value: string; displayedValue: string }[];
  onSelect?: DropdownOptionProps["onSelect"];
}) => {
  const dropdownRef =
    React.useRef<DropdownRef>() as React.MutableRefObject<DropdownRef>;

  const selectValueDisplayed =
    options?.find((opt) => opt.value === selectedValue)?.displayedValue ??
    "select an option";

  return (
    <Div>
      <Pressable
        style={{
          minWidth: 200,
          minHeight: 30,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        onPress={() => dropdownRef.current?.open()}
      >
        <Text>{selectValueDisplayed}</Text>
      </Pressable>

      <DropdownM
        ref={dropdownRef!}
        title={
          <Text mx="xl" pb="md">
            {title}
          </Text>
        }
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl"
      >
        {options.map((option, index) => {
          const selected = option.value === selectedValue;
          return (
            <DropdownM.Option
              onPress={() => {
                dropdownRef.current.close();
                if (onSelect) onSelect(option.value);
              }}
              key={index}
              py="md"
              px={50}
              pl={selected ? 50 : 100}
              block
              value={option.value}
              {...(selected && {
                prefix: (
                  <Icon
                    name="check"
                    fontFamily="Feather"
                    mr="lg"
                    color="green500"
                    fontSize="3xl"
                  />
                ),
              })}
            >
              {option.displayedValue}
            </DropdownM.Option>
          );
        })}
      </DropdownM>
    </Div>
  );
};

export default DropDown;
