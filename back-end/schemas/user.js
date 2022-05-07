// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: 'user',   // name of the schema / model...
    title: 'User',  // Display at Sidebar in UI
    type: 'document',
    fields: [
        {
            name: 'userName',   // Become key / property name at object
            title: 'UserName',  // Display at UI
            type: 'string',     // data type of value about this property
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string',
        },
    ],
};
