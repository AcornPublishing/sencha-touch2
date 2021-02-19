Ext.define("Gallery.common.GalleryData",{
	singleton: true,

    // 위치파악 
    totDataPos:0,
    maxDataPos:0,
    minDataPos:0,
    curDataPos:0,
    
    // 현재의 정보 
    curId:'0',
    curSubject:'',
    curContent:'',
    curImg:'',
    
    // 데이터       
    orgData:new Array(0)

});