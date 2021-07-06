import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'

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
            component: () => import('./components/Verification.vue')
        },
        {
            path: '/registration',
            component: () => import('./components/Registration.vue')
        },
        {
            path: '/authorization',
            component: () => import('./components/Authorization.vue')
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
            component: () => import('./components/BookingList.vue')
        },
        {
            path: '/addRoom',
            component: () => import('./components/AddRoom.vue'),
            props: true
        },
        {
            path: '/hotel/:id',
            component: () => import('./components/hotel/SingleHotel.vue'),
            props: true
        },
        {
            path: '/roombooking/:id',
            component: () => import('./components/RoomBooking.vue'),
            props: true
        },
        {
            path: '/room/hotel/:id',
            component: () => import('./components/ItemList.vue'),
            props: true
        },
        {
            path: '/booking/:id',
            component: () => import('./components/Booking.vue'),
            props: true
        },
        {
            path: '/room/:id',
            component: () => import('./components/Room.vue'),
            props: true
        }

    ]
})
