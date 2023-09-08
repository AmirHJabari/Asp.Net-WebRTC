
var sr = new signalR.HubConnectionBuilder()
    .withUrl("/WebRTCHub")
    .withAutomaticReconnect()
    .build();

const fromSocket = document.getElementById('userId')
const localVideo = document.getElementById('localVideo')
const remoteVideo = document.getElementById('remoteVideo')
const videoEl = document.getElementById('videoEl')
const canvasEl = document.getElementById('canvasEl')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const call = document.getElementById('call')
const mute = document.getElementById('mute')
const unMute = document.getElementById('unMute')
const stop = document.getElementById('stop')
const toSocket = document.getElementById('toSocket')
let tracks = []
//configuration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }], iceTransportPolicy: 'all' }

 const configuration = {
     iceServers:[
         {url: `stun:stun.imafex.sk:3478`},
         {url: `stun:stun.simlar.org:3478`},
         {url: `stun:stun.bluesip.net:3478`},
         {url: `stun:stun.voipvoice.it:3478`},
         {url: `stun:stun.fbsbx.com:3478`},
         {url: `stun:stun.root-1.de:3478`},
         {url: `stun:stun.geesthacht.de:3478`},
         {url: `stun:stun.muoversi.net:3478`},
         {url: `stun:stun.peethultra.be:3478`},
         {url: `stun:stun.ipfire.org:3478`},
         {url: `stun:stun.eleusi.com:3478`},
         {url: `stun:stun.sipy.cz:3478`},
         {url: `stun:stun.voip.aebc.com:3478`},
         {url: `stun:stun.vivox.com:3478`},
         {url: `stun:stun.ippi.com:3478`},
         {url: `stun:stun.stadtwerke-eutin.de:3478`},
         {url: `stun:stun.leonde.org:3478`},
         {url: `stun:stun.telnyx.com:3478`},
         {url: `stun:stun.wia.cz:3478`},
         {url: `stun:stun.geonet.ro:3478`},
         {url: `stun:stun.jabber.dk:3478`},
         {url: `stun:stun.voipgate.com:3478`},
         {url: `stun:stun.meowsbox.com:3478`},
         {url: `stun:stun.xten.com:3478`},
         {url: `stun:stun.3wayint.com:3478`},
         {url: `stun:stun.yesdates.com:3478`},
         {url: `stun:stun.nfon.net:3478`},
         {url: `stun:stun.aaisp.co.uk:3478`},
         {url: `stun:stun.h4v.eu:3478`},
         {url: `stun:stun.tula.nu:3478`},
         {url: `stun:stun.voztele.com:3478`},
         {url: `stun:stun.labs.net:3478`},
         {url: `stun:stun.vo.lu:3478`},
         {url: `stun:stun.nexxtmobile.de:3478`},
         {url: `stun:stun.zentauron.de:3478`},
         {url: `stun:stun.antisip.com:3478`},
         {url: `stun:stun.mobile-italia.com:3478`},
         {url: `stun:stun2.l.google.com:19302`},
         {url: `stun:stun.voipzoom.com:3478`},
         {url: `stun:stun.openvoip.it:3478`},
         {url: `stun:stun.westtel.ky:3478`},
         {url: `stun:stun.l.google.com:19305`},
         {url: `stun:stun.sippeer.dk:3478`},
         {url: `stun:stun.smsdiscount.com:3478`},
         {url: `stun:stun.newrocktech.com:3478`},
         {url: `stun:stun.voipdiscount.com:3478`},
         {url: `stun:stun.deepfinesse.com:3478`},
         {url: `stun:stun.verbo.be:3478`},
         {url: `stun:stun.yollacalls.com:3478`},
         {url: `stun:stun.clickphone.ro:3478`},
         {url: `stun:stun.aa.net.uk:3478`},
         {url: `stun:stun3.l.google.com:19302`},
         {url: `stun:stun.rynga.com:3478`},
         {url: `stun:stun.leucotron.com.br:3478`},
         {url: `stun:stun.gigaset.net:3478`},
         {url: `stun:stun.localphone.com:3478`},
         {url: `stun:stun.fathomvoice.com:3478`},
         {url: `stun:stun.talkho.com:3478`},
         {url: `stun:stun.wtfismyip.com:3478`},
         {url: `stun:stun.voipgrid.nl:3478`},
         {url: `stun:stun.voipbusterpro.com:3478`},
         {url: `stun:stun.sipthor.net:3478`},
         {url: `stun:stun.vincross.com:3478`},
         {url: `stun:stun.voipstreet.com:3478`},
         {url: `stun:stun.londonweb.net:3478`},
         {url: `stun:stun.junet.se:3478`},
         {url: `stun:stun.godatenow.com:3478`},
         {url: `stun:stun.ru-brides.com:3478`},
         {url: `stun:stun.groenewold-newmedia.de:3478`},
         {url: `stun:relay.webwormhole.io:3478`},
         {url: `stun:stun.nanocosmos.de:3478`},
         {url: `stun:stun.officinabit.com:3478`},
         {url: `stun:stun.sipglobalphone.com:3478`},
         {url: `stun:stun.engineeredarts.co.uk:3478`},
         {url: `stun:stun.webmatrix.com.br:3478`},
         {url: `stun:stun.solcon.nl:3478`},
         {url: `stun:stun.bcs2005.net:3478`},
         {url: `stun:stun.tichiamo.it:3478`},
         {url: `stun:stun.logic.ky:3478`},
         {url: `stun:stun1.l.google.com:19305`},
         {url: `stun:stun.myspeciality.com:3478`},
         {url: `stun:stun.openjobs.hu:3478`},
         {url: `stun:stun.infra.net:3478`},
         {url: `stun:stun.gmx.de:3478`},
         {url: `stun:stun.3deluxe.de:3478`},
         {url: `stun:stun.voztovoice.org:3478`},
         {url: `stun:stun.tel.lu:3478`},
         {url: `stun:stun.moonlight-stream.org:3478`},
         {url: `stun:stun.connecteddata.com:3478`},
         {url: `stun:stun.voys.nl:3478`},
         {url: `stun:stun.avoxi.com:3478`},
         {url: `stun:stun.streamnow.ch:3478`},
         {url: `stun:stun.dcalling.de:3478`},
         {url: `stun:stun.it1.hr:3478`},
         {url: `stun:stun.thinkrosystem.com:3478`},
         {url: `stun:stun.eoni.com:3478`},
         {url: `stun:stun.jowisoftware.de:3478`},
         {url: `stun:stun.foad.me.uk:3478`},
         {url: `stun:stun.poetamatusel.org:3478`},
         {url: `stun:stun.kanojo.de:3478`},
         {url: `stun:stun.isp.net.au:3478`},
         {url: `stun:stun.otos.pl:3478`},
         {url: `stun:stun.alphacron.de:3478`},
         {url: `stun:stun.gmx.net:3478`},
         {url: `stun:stun.synergiejobs.be:3478`},
         {url: `stun:stun.genymotion.com:3478`},
         {url: `stun:stun.frozenmountain.com:3478`},
         {url: `stun:stun.pure-ip.com:3478`},
         {url: `stun:stun.sma.de:3478`},
         {url: `stun:stun.nextcloud.com:3478`},
         {url: `stun:stun.olimontel.it:3478`},
         {url: `stun:stun.vadacom.co.nz:3478`},
         {url: `stun:stun.edwin-wiegele.at:3478`},
         {url: `stun:stun.mywatson.it:3478`},
         {url: `stun:stun.t-online.de:3478`},
         {url: `stun:stun.vavadating.com:3478`},
         {url: `stun:stun.var6.cn:3478`},
         {url: `stun:stun.selasky.org:3478`},
         {url: `stun:stun.teliax.com:3478`},
         {url: `stun:stun.swrag.de:3478`},
         {url: `stun:stun.dls.net:3478`},
         {url: `stun:stun.smartvoip.com:3478`},
         {url: `stun:stun.bitburger.de:3478`},
         {url: `stun:stun.plexicomm.net:3478`},
         {url: `stun:stun.hoiio.com:3478`},
         {url: `stun:stun.avigora.fr:3478`},
         {url: `stun:stun.hot-chilli.net:3478`},
         {url: `stun:stun.m-online.net:3478`},
         {url: `stun:stun.stochastix.de:3478`},
         {url: `stun:stun.elitetele.com:3478`},
         {url: `stun:stun.ctafauni.it:3478`},
         {url: `stun:stun.freeswitch.org:3478`},
         {url: `stun:stun.ringostat.com:3478`},
         {url: `stun:stun.mit.de:3478`},
         {url: `stun:stun.easter-eggs.com:3478`},
         {url: `stun:stun.schoeffel.de:3478`},
         {url: `stun:stun.solnet.ch:3478`},
         {url: `stun:stun.wxnz.net:3478`},
         {url: `stun:stun.rolmail.net:3478`},
         {url: `stun:stun4.l.google.com:19302`},
         {url: `stun:stun.acrobits.cz:3478`},
         {url: `stun:stun.siptrunk.com:3478`},
         {url: `stun:stun.ladridiricette.it:3478`},
         {url: `stun:stun.istitutogramscisiciliano.it:3478`},
         {url: `stun:stun.alberon.cz:3478`},
         {url: `stun:stun.medvc.eu:3478`},
         {url: `stun:stun2.l.google.com:19305`},
         {url: `stun:stun.cellmail.com:3478`},
         {url: `stun:stun.atagverwarming.nl:3478`},
         {url: `stun:stun.url.net.au:3478`},
         {url: `stun:stun.voipwise.com:3478`},
         {url: `stun:stun.gntel.nl:3478`},
         {url: `stun:stun.lleida.net:3478`},
         {url: `stun:stun.bergophor.de:3478`},
         {url: `stun:stun.voipconnect.com:3478`},
         {url: `stun:stun.tel2.co.uk:3478`},
         {url: `stun:stun.uabrides.com:3478`},
         {url: `stun:stun.uls.co.za:3478`},
         {url: `stun:stun.5sn.com:3478`},
         {url: `stun:stun.ippi.fr:3478`},
         {url: `stun:stun.optdyn.com:3478`},
         {url: `stun:stun.powervoip.com:3478`},
         {url: `stun:stun.comrex.com:3478`},
         {url: `stun:stun.annatel.net:3478`},
         {url: `stun:stun4.l.google.com:19305`},
         {url: `stun:stun.studio71.it:3478`},
         {url: `stun:stun.voip.blackberry.com:3478`},
         {url: `stun:stun.l.google.com:19302`},
         {url: `stun:stun.sipdiscount.com:3478`},
         {url: `stun:stun.qcol.net:3478`},
         {url: `stun:stun.nexphone.ch:3478`},
         {url: `stun:stun.voipplanet.nl:3478`},
         {url: `stun:stun.bernardoprovenzano.net:3478`},
         {url: `stun:stun.komsa.de:3478`},
         {url: `stun:stun.futurasp.es:3478`},
         {url: `stun:stun.jumblo.com:3478`},
         {url: `stun:stun.arkh-edu.ru:3478`},
         {url: `stun:stun.meetwife.com:3478`},
         {url: `stun:stun.1-voip.com:3478`},
         {url: `stun:stun.tng.de:3478`},
         {url: `stun:stun.sewan.fr:3478`},
         {url: `stun:stun.skydrone.aero:3478`},
         {url: `stun:stun.ekiga.net:3478`},
         {url: `stun:stun.planetarium.com.br:3478`},
         {url: `stun:stun.levigo.de:3478`},
         {url: `stun:stun.fixup.net:3478`},
         {url: `stun:stun.imp.ch:3478`},
         {url: `stun:stun.voipia.net:3478`},
         {url: `stun:stun.schlund.de:3478`},
         {url: `stun:stun.commpeak.com:3478`},
         {url: `stun:stun.soho66.co.uk:3478`},
         {url: `stun:stun.epygi.com:3478`},
         {url: `stun:stun.jay.net:3478`},
         {url: `stun:stun.threema.ch:3478`},
         {url: `stun:stun.diallog.com:3478`},
         {url: `stun:stun.thebrassgroup.it:3478`},
         {url: `stun:stun.vozelia.com:3478`},
         {url: `stun:stun.crimeastar.net:3478`},
         {url: `stun:stun.peeters.com:3478`},
         {url: `stun:stun.graftlab.com:3478`},
         {url: `stun:stun.dunyatelekom.com:3478`},
         {url: `stun:stun.ozekiphone.com:3478`},
         {url: `stun:stun.syncthing.net:3478`},
         {url: `stun:stun.poivy.com:3478`},
         {url: `stun:stun.syrex.co.za:3478`},
         {url: `stun:stun.carlovizzini.it:3478`},
         {url: `stun:stun.ppdi.com:3478`},
         {url: `stun:stun.romancecompass.com:3478`},
         {url: `stun:stun.heeds.eu:3478`},
         {url: `stun:stun.anlx.net:3478`},
         {url: `stun:stun.next-gen.ro:3478`},
         {url: `stun:stun.cope.es:3478`},
         {url: `stun:stun.allflac.com:3478`},
         {url: `stun:iphone-stun.strato-iphone.de:3478`},
         {url: `stun:stun.counterpath.net:3478`},
         {url: `stun:stun.babelforce.com:3478`},
         {url: `stun:stun1.l.google.com:19302`},
         {url: `stun:stun.gravitel.ru:3478`},
         {url: `stun:stun.voip.eutelia.it:3478`},
         {url: `stun:stun.splicecom.com:3478`},
         {url: `stun:stun.sigmavoip.com:3478`},
         {url: `stun:stun.liveo.fr:3478`},
         {url: `stun:stun.easybell.de:3478`},
         {url: `stun:stun.shadrinsk.net:3478`},
         {url: `stun:stun.grazertrinkwasseringefahr.at:3478`},
         {url: `stun:stun.ncic.com:3478`},
         {url: `stun:stun.acronis.com:3478`},
         {url: `stun:stun.jabbim.cz:3478`},
         {url: `stun:stun.siplogin.de:3478`},
         {url: `stun:stun.lineaencasa.com:3478`},
         {url: `stun:stun.kedr.io:3478`},
         {url: `stun:stun.callromania.ro:3478`},
         {url: `stun:stun.ixc.ua:3478`},
         {url: `stun:stun.fitauto.ru:3478`},
         {url: `stun:stun.srce.hr:3478`},
         {url: `stun:stun.fairytel.at:3478`},
         {url: `stun:stun.ortopediacoam.it:3478`},
         {url: `stun:stun.bearstech.com:3478`},
         {url: `stun:stun.vomessen.de:3478`},
         {url: `stun:stun3.l.google.com:19305`},
         {url: `stun:stun.voicetrading.com:3478`},
         {url: `stun:stun.mixvoip.com:3478`},
         {url: `stun:stun.lovense.com:3478`},
         {url: `stun:stun.waterpolopalermo.it:3478`},
         {url: `stun:stun.sky.od.ua:3478`},
         {url: `stun:stun.cibercloud.com.br:3478`},
         {url: `stun:stun.myhowto.org:3478`},
         {url: `stun:stun.voipfibre.com:3478`},
         {url: `stun:stun.cablenet-as.net:3478`},
         {url: `stun:stun.sonetel.net:3478`},
         {url: `stun:stun.megatel.si:3478`},
         {url: `stun:stun.rockenstein.de:3478`},
         {url: `stun:stun.linuxtrent.it:3478`},
         {url: `stun:stun.autosystem.com:3478`},
         {url: `stun:stun.internetcalls.com:3478`},
         {url: `stun:stun.baltmannsweiler.de:3478`},
         {url: `stun:stun.solomo.de:3478`},
         {url: `stun:stun.voicetech.se:3478`},
         {url: `stun:stun.healthtap.com:3478`},
         {url: `stun:stun.voipbuster.com:3478`},
         {url: `stun:stun.files.fm:3478`},
         {url: `stun:stun.voipblast.com:3478`},
         {url: `stun:stun.voipcheap.com:3478`},
         {url: `stun:stun.counterpath.com:3478`},
         {url: `stun:stun.schulinformatik.at:3478`},
         {url: `stun:stun.axeos.nl:3478`},
         {url: `stun:stun.bethesda.net:3478`},
         {url: `stun:stun.eurosys.be:3478`},
         {url: `stun:stun.bridesbay.com:3478`},
         {url: `stun:stun.hide.me:3478`},
         {url: `stun:stun.sip.us:3478`},
         {url: `stun:stun.piratenbrandenburg.de:3478`},
         {url: `stun:stun.bandyer.com:3478`},
         {url: `stun:stun.1und1.de:3478`},
         {url: `stun:stun.ttmath.org:3478`},
         {url: `stun:stun.romaaeterna.nl:3478`},
         {url: `stun:stun.framasoft.org:3478`},
         {url: `stun:stun.sylaps.com:3478`},
         {url: `stun:stun.fmo.de:3478`},
         {url: `stun:stun.dus.net:3478`},
         {url: `stun:stun.sonetel.com:3478`},
         {url: `stun:stun.myvoipapp.com:3478`},
         {url: `stun:stun.signalwire.com:3478`},
         {url: `stun:stun.galeriemagnet.at:3478`},
         {url: `stun:stun.goldfish.ie:3478`},
         {url: `stun:stun.netgsm.com.tr:3478`},
         {url: `stun:stun.oncloud7.ch:3478`},
         {url: `stun:stun.eol.co.nz:3478`},
         {url: `stun:stun.taxsee.com:3478`},
         {url: `stun:stun.neomedia.it:3478`},
         {url: `stun:stun.usfamily.net:3478`},
         {url: `stun:stun.twt.it:3478`},
         {url: `stun:stun.radiojar.com:3478`},
         {url: `stun:stun.netappel.com:3478`},
         {url: `stun:stun.wemag.com:3478`},
         {url: `stun:stun.f.haeder.net:3478`},
         {url: `stun:stun.totalcom.info:3478`},
         {url: `stun:stun.hicare.net:3478`},
         {url: `stun:stun.intervoip.com:3478`},
         {url: `stun:stun.teamfon.de:3478`},
         {url: `stun:stun.marcelproust.it:3478`},
         {url: `stun:stun.acquageraci.it:3478`},
         {url: `stun:stun.actionvoip.com:3478`},
         {url: `stun:stun.wcoil.com:3478`},
         {url: `stun:stun.ukh.de:3478`},
         {url: `stun:stun.halonet.pl:3478`},
         {url: `stun:stun.nextcloud.com:443`},
         {url: `stun:stun.technosens.fr:3478`},
         {url: `stun:stun.cheapvoip.com:3478`},
         {url: `stun:stun.alpirsbacher.de:3478`},
         {url: `stun:stun.zadarma.com:3478`},
         {url: `stun:stun.landvast.nl:3478`},
         {url: `stun:stun.irishvoip.com:3478`},
         {url: `stun:stun.nonoh.net:3478`},
         {url: `stun:stun.voipxs.nl:3478`},
         {url: `stun:stun.siedle.com:3478`},
         {url: `stun:stun.ipshka.com:3478`},
         {url: `stun:stun.easyvoip.com:3478`},
         {url: `stun:stun.12voip.com:3478`},
         {url: `stun:stun.lebendigefluesse.at:3478`},
         {url: `stun:stun.miwifi.com:3478`},
         {url: `stun:stun.linphone.org:3478`},
         {url: `stun:stun.studio-link.de:3478`},
         {url: `stun:stun.kaseya.com:3478`},
     ],
     iceTransportPolicy: 'all'
 }
let peer = new RTCPeerConnection(configuration)
let fromSocketId, toSocketId
canvasEl.hidden = true
let x,y,z
var points = []

sr.start().then(function () {
    console.log("SignalR connected.");
    fromSocket.innerText = sr.connectionId;
    fromSocketId = sr.connectionId
}).catch((err) =>
{
    return console.error(err.toString());
});

//get Local Media
const openMediaDevices = async() => {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
        localVideo.srcObject = stream
        tracks = stream.getTracks()
        return stream
    } catch (error) {
        console.log(error)
    }
}

//Display localVideo on Canvas
localVideo.addEventListener('loadedmetadata', () => {
    canvas.width = localVideo.videoWidth
    canvas.height = localVideo.videoHeight
}) 
localVideo.addEventListener('play', () => {
    const loop = () => {
        if(!localVideo.paused && !localVideo.ended) {
            ctx.drawImage(localVideo,0,0)
            setTimeout(loop,30)
            draw()
        }
    }
    loop()
})

//Get Position
const getPosition = (e) => {
    let rect = canvas.getBoundingClientRect()
    let correctX = canvas.width / rect.width
    let correctY = canvas.height / rect.height
    if (e.buttons !== 1) return
    z=1
    x = (e.clientX - rect.left) * correctX
    y = (e.clientY - rect.top) * correctY
    points.push({x,y,z})
}

//get End Points
const getEndPoints = () => {
    points.slice(-1)[0].z =0
}
//Draw Function
const draw = () => {
    points.forEach( item => {
        let nextItem = points[points.indexOf(item)+1]
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = 'red'
        if(item.z==1){
            ctx.moveTo(item.x,item.y)
            if(typeof nextItem !=='undefined'){
            ctx.lineTo(nextItem.x,nextItem.y)
            ctx.stroke()
            }          
        }
    })
}

//Erase
erase.addEventListener('click', () => points = [] )

//Draw with mouse on canvas
canvas.addEventListener('mousemove', getPosition)
canvas.addEventListener('mouseup', getEndPoints)

//get Canvas Media
const getCanvasStream = async() => {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
        localVideo.srcObject = stream
        tracks = stream.getTracks()
        let canvasStream = canvas.captureStream()
        if (stream.getAudioTracks()[0]) {
            canvasStream.addTrack(stream.getAudioTracks()[0])
        }
        console.log('canvasStream tracks: ', canvasStream.getTracks())
        return canvasStream 
    } catch (error) {
        console.log(error)
    }
}

//Create Offer
const createOffer = async() => {
    try {
        let stream = await getCanvasStream()
        stream.getTracks().forEach( track => peer.addTrack(track))
        let offer = await peer.createOffer()
        peer.setLocalDescription (new RTCSessionDescription(offer))
        //Ice Candidate
        peer.addEventListener('icecandidate', e => {
            if (e.candidate){
                sr.invoke(`callerCandidate`,{'candidate': e.candidate, "fromSocketId": fromSocketId, 'toSocketId': toSocketId});
            }     
        });
        //send Offer to Server
        toSocketId = toSocket.value
        sr.invoke(`offer`, {'offer': offer, "fromSocketId": fromSocketId, 'toSocketId': toSocketId});
    } catch (error) {
        console.log(error)
    }
}

//create Answer
const createAnswer = async(destination) => {
    try {
        let stream = await  openMediaDevices()
        stream.getTracks().forEach( track => peer.addTrack(track))
        let answer = await peer.createAnswer()
        peer.setLocalDescription (new RTCSessionDescription(answer))
        //Ice Candidate
        peer.addEventListener('icecandidate', e => {
            if (e.candidate){
                sr.invoke('calleeCandidate',{'candidate': e.candidate, 'destination': destination})
            }     
        })
        //Send Answer to Server
        sr.invoke('answer', {'answer': answer, 'destination': destination})

    } catch (error) {
        console.log(error)
    } 
}

//Receive Offer
sr.on('offer', data => {
    peer.setRemoteDescription(data.offer)
    let stream = new MediaStream()
    createAnswer(data.fromSocketId)
    peer.ontrack = e => {
        stream.addTrack(e.track)
        remoteVideo.srcObject = stream
    }
})

//Receive Answer
sr.on('answer', data => {
    peer.setRemoteDescription(data.answer)
    let stream = new MediaStream()
    peer.ontrack = e => {
        stream.addTrack(e.track)
        remoteVideo.srcObject = stream
    }
})

//Start a Call
call.addEventListener('click',() => {
    canvasEl.hidden = false
    videoEl.hidden = true
    createOffer()
    mute.addEventListener('click',muteTracks)
    stop.addEventListener('click',stopTracks)
})

//Mute Tracks
const muteTracks = () => {
    tracks.forEach( track => track.enabled = false)
    unMute.addEventListener('click',unMuteTracks)
}

//unMute Tracks
const unMuteTracks = () => {
    tracks.forEach( track => track.enabled = true)
}

//Stop Tracks
const stopTracks = () => {
    tracks.forEach( track => track.stop())
}

//caller Candidates
sr.on('callerCandidate', data => {
    peer.addIceCandidate(data)
})

//callee Candidates
sr.on('calleeCandidate', data => {
    peer.addIceCandidate(data)
})
