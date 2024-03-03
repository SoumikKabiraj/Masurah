export const userMenu =[
    {
        name: 'All Items',
        path: '/items',
        icon: 'fa-solid fa-list'
    },
    {
        name: 'Cart',
        path: '/Cart',
        icon: 'fa-solid fa-cart-shopping'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-address-card'
    }
]


// menu for admin

export const adminMenu =[
    // {
    //     name:'Home',
    //     path: '/home',
    //     icon: 'fa-solid fa-house'
    // },
    {
        name: 'Users List',
        path: '/admin/users',
        icon: 'fa-solid fa-user'
    },
    {
        name: 'Inventory',
        path: '/inventory',
        // need to make Inventory that will show all the items and quantity available 
        icon: 'fa-solid fa-list'
    },
    {
        name: 'Add Item',
        path: '/admin/AddItem',
        icon: 'fa-solid fa-pencil'
    },
    {
        name: 'Add Category',
        path: '/admin/AddCategory',
        icon: 'fa-solid fa-table'
        // <i class="fa-regular fa-table-cells-large"></i>
    },
    {
        name: 'Stats',
        path: '/admin/stats',
        icon: 'fa-solid fa-signal'
        // <i class="fa-solid fa-signal"></i>
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'fa-solid fa-address-card'
    }
]