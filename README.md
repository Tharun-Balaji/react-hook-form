# React Hook Form with Zod, TypeScript, and Material-UI

## Overview

This project demonstrates an advanced form handling solution using React Hook Form, Zod for schema validation, TypeScript for type safety, and Material-UI for components. It provides a robust and type-safe form management experience with comprehensive validation and customization.

## 🚀 Features

- **Efficient Form Handling**: Leverages React Hook Form's powerful API for seamless form state management
- **Material-UI Integration**: Fully compatible with Material-UI components
- **Zod Schema Validation**: Robust data validation with complex schema definitions
- **TypeScript Support**: Enhanced type safety and code readability
- **Custom Validation**: Flexible validation logic with Zod
- **Dynamic Form Variants**: Support for create and edit form modes

## 📦 Prerequisites

- Node.js (v14 or later)
- npm or Yarn

## 🛠️ Technologies Used

- React
- React Hook Form
- Zod
- TypeScript
- Material-UI
- Vite (assumed build tool)

## 🧑‍💻 Code Snippets

### 1. Zod Schema Validation

```typescript
import { z } from "zod";

export const schema = z
  .intersection(
    z.object({
      // Robust validation rules
      name: z.string().min(1, { message: "Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((email) => patterns.email.test(email), {
          message: "Invalid email address",
        }),
      states: z.array(z.string()).min(1).max(2),
      skills: z
        .array(z.string())
        .max(2, { message: "You can only select up to 2 skills" }),
      registrationDateAndTime: z.date(),
      isTeacher: z.boolean(),
    }),
    // Discriminated union for form variants
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({
        variant: z.literal("edit"),
        id: z.string().min(1),
      }),
    ])
  )
  .and(
    // Conditional validation for teacher-specific fields
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      })
    ])
  );
```

### 2. Data Mapping Utility

```typescript
function mapData(data: Schema): ApiCreateEdit {
  const common: Common = {
    email: data.email,
    name: data.name,
    states: data.states,
    // ... other common fields
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, id: Number(data.id), variant: data.variant };
    }
  }
}
```

### 3. Custom Form Component Example

```typescript
// RHFAutocomplete.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export function RHFAutocomplete({ 
  name, 
  label, 
  options, 
  ...other 
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
```

## 📂 Project Structure

```
src/
├── components/          # Reusable form components
│   ├── RHFDateRangePicker.tsx
│   ├── RHFAutocomplete.tsx
│   └── ...
├── services/            # API-related services
│   ├── mutations.ts
│   └── queries.ts
├── types/               # TypeScript type definitions
│   ├── apiTypes.ts
│   └── schema.ts
├── utils/               # Utility functions
│   ├── mapData.ts
│   └── constants.ts
├── App.tsx
└── main.tsx
```

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## 📝 Key Validation Features

### Form Schema Validation
- Name: Required, minimum length
- Email: Required, regex pattern validation
- States: 1-2 selections allowed
- Skills: Maximum 2 selections
- Dynamic validation based on form mode (create/edit)
- Conditional validation for teacher-specific fields

## 🧪 Testing the Form

The demo is available at: https://reat-hook-form.netlify.app/

## 💡 Key Components

- `RHFDateRangePicker`: Date range selection
- `RHFAutocomplete`: Autocomplete input
- `RHFSwitch`: Toggle switch
- And more custom form components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License.

## 🔗 Original Repository

[GitHub Repository](https://github.com/Tharun-Balaji/react-hook-form)

## 👨‍💻 Author

Tharun Balaji