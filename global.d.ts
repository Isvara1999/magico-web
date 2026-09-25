import React from 'react';

interface ImportMetaEnv {
  readonly VITE_REFORESTATION_ALIAS?: string;
  readonly VITE_REFORESTATION_ACCOUNT_HOLDER?: string;
  readonly VITE_REFORESTATION_CBU?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace JSX {
    type Element = React.JSX.Element;
    type IntrinsicElements = React.JSX.IntrinsicElements;
    type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
    type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
    type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
    type ElementClass = React.JSX.ElementClass;
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  }
}
