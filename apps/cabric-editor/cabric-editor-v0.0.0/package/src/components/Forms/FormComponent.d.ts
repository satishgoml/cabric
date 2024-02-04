/* eslint-disable @typescript-eslint/no-explicit-any */
import {  FormLabelProps, RadioGroupProps, SelectFieldProps, SelectProps, TextareaProps, InputProps } from "@chakra-ui/react";


export type commonFormComponentType  ={
  required: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  rest?: any;
  maxLength?:number
  labelStyle?: FormLabelProps;
  responsive?:boolean;
  infoIcon?:boolean;
  disabled?:boolean;
  fieldType?:string;
  width?:string;
} 
export interface optionType extends commonFormComponentType,  SelectFieldProps {
  options: { label: string | number; value: string | number; }[];
  fieldStyle ? : SelectProps;
  isMulti? : boolean;
}

export interface textAreaType extends commonFormComponentType, TextareaProps {
  maxLength?:  number;
  value : string;
  onChange : (e : string) => void;
}

export interface radioPropType extends commonFormComponentType, RadioGroupProps {
  children : React.Elements;
}


export interface dateFieldType extends commonFormComponentType {
  value?: string;
  onChange?: (e : string) => void;
}


export interface InputFieldType extends commonFormComponentType, InputProps  {
  showLength?: boolean;
  value?: string;
  labelInfo?: () => React.ReactElement | null
}


export interface SwitchGroupProps
  extends commonFormComponentType,
    FormControlProps {
  currentTextValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}

export interface SwitchGroupFormControlProps
  extends commonFormComponentType {
  currentTextValue: string;
}

