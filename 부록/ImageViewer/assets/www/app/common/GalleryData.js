Ext.define("Gallery.common.GalleryData",{
	singleton: true,

    totDataPos:0,
    maxDataPos:0,
    minDataPos:0,
    curDataPos:0,
    curId:'0',
    curSubject:'',
    curContent:'',
    curImg:'',

    orgData:new Array(0),
    totData:new Array(0),

	popRotate:'rotate0',
	popSize: 100,
});