const showSidebarReducer = (showSide = "d-none",action) =>{
    switch(action.type){
        case 'SHOW_SIDE' : 
        showSide = "showSidebar"
        return  showSide;
        case 'HIDE_SIDE':
            showSide = "hideSidebar"
            return showSide
        default :
        return showSide
    }
}

export default showSidebarReducer;