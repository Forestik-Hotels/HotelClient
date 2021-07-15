import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/navigation/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/app',
            component: () => import('./App')
        },
        {
            path: '/verifyEmail',
            // component: Home
            component: () => import('./components/auth_registry/Verification.vue')
        },
        {
            path: '/registration',
            component: () => import('./components/auth_registry/Registration.vue')
        },
        {
            path: '/authorization',
            component: () => import('./components/auth_registry/Authorization.vue')
        },
        {
            path: '/hotelsBoard',
            component: () => import('./components/hotel/HotelsBoard.vue')
        },
        {
            path: '/addHotel',
            component: () => import('./components/hotel/AddHotel.vue')
        },
        {
            path: '/bookingList',
            component: () => import('./components/booking/BookingList.vue')
        },
        {
            path: '/profile',
            component: () => import('./components/profile/Profile.vue')
        },
        {
            path: '/userList',
            component: () => import('./components/admin/ArticleByUserId.vue')
        },
        {
            path: '/user/:id',
            component: () => import('./components/admin/User.vue'),
            props: true
        },
        {
            path: '/addRoom',
            component: () => import('./components/room/AddRoom.vue'),
            props: true
        },
        {
            path: '/hotel/:id',
            component: () => import('./components/hotel/SingleHotel.vue'),
            props: true
        },
        {
            path: '/roombooking/:id',
            component: () => import('./components/room/RoomBooking.vue'),
            props: true
        },
        {
            path: '/room/hotel/:id',
            component: () => import('./components/room/ItemList.vue'),
            props: true
        },
        {
            path: '/booking/:id',
            component: () => import('./components/booking/Booking.vue'),
            props: true
        },
        {
            path: '/room/:id',
            component: () => import('./components/room/Room.vue'),
            props: true
        }

    ]
})
