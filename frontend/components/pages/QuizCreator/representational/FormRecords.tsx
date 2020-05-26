import React from "react";

export const FormRecords = ({formRecords}) => {
    const forms = formRecords.map(form => {
        return (
            <div data-form-id={form.id} key={`form${form.id}`}>
                {form.id}
            </div>
        )
    });

    return forms;
}
