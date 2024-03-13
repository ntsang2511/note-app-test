export default {
    authors: [
        {
            id: 123,
            name: 'Sang'
        },
        {
            id: 999,
            name: 'Nhan'
        }
    ],
    folders: [
        {
            id: "1",
            name: 'Home',
            createdAt: '2022-11-18T03:42:132',
            authorId: 123,
        },
        {
            id: "2",
            name: 'DataSpike',
            createdAt: '2022-11-18T03:42:132',
            authorId: 999,
        },
        {
            id: "3",
            name: 'Shit',
            createdAt: '2022-09-18T03:42:132',
            authorId: 123,
        },
    ],
    notes: [
        {
            id: "123",
            content: '<p> Go to the home page </p>',
            folderId: "1"
        },
        {
            id: "234",
            content: '<p> Go to the detail page </p>',
            folderId: "2"
        },
        {
            id: "456",
            content: '<p> Go to the products page </p>',
            folderId: "1"
        },
    ]
}