const net = new brain.NeuralNetwork()

const data = [{"input":{"r":0,"g":0,"b":0},"output":[1]},{"input":{"r":1,"g":1,"b":1},"output":[0]},{"input":{"r":0.20835108209705822,"g":0.4782371948510038,"b":0.07328502739499188},"output":[0]},{"input":{"r":0.9849463200849544,"g":0.6386344794196095,"b":0.7767430066604888},"output":[0]},{"input":{"r":0.07414525345337797,"g":0.5652876219634582,"b":0.8783295613683011},"output":[1]},{"input":{"r":0.12649659070058927,"g":0.0721748856636677,"b":0.958330604853753},"output":[1]},{"input":{"r":0.407580800107884,"g":0.050955958681109026,"b":0.7181472566517839},"output":[1]},{"input":{"r":0.5248991532946243,"g":0.5168500793368218,"b":0.9537883951070103},"output":[0]},{"input":{"r":0.5271812633406043,"g":0.930756284200601,"b":0.8114744010666752},"output":[0]},{"input":{"r":0.10766365866046201,"g":0.931223658073288,"b":0.3156922632956274},"output":[0]},{"input":{"r":0.7229738271000092,"g":0.9029772351133656,"b":0.8017428605862595},"output":[0]},{"input":{"r":0.7558269404895257,"g":0.3701311734079571,"b":0.9825013150553903},"output":[1]},{"input":{"r":0.6258534218402685,"g":0.10215631200865749,"b":0.5365196705243127},"output":[1]},{"input":{"r":0.6391078461373005,"g":0.4913742947672537,"b":0.3982069174065439},"output":[1]},{"input":{"r":0.836989618136899,"g":0.9309094389397907,"b":0.8606535067214256},"output":[0]},{"input":{"r":0.5414621497594054,"g":0.8829347737021362,"b":0.9175421606951162},"output":[0]},{"input":{"r":0.43577342079303283,"g":0.9178081078569684,"b":0.2472775849573159},"output":[0]},{"input":{"r":0.04040084776206321,"g":0.34890513694678726,"b":0.8036663079316766},"output":[1]},{"input":{"r":0.7111222725254907,"g":0.19172353189902047,"b":0.13853188065377342},"output":[1]},{"input":{"r":0.6860915113968535,"g":0.9845341969617789,"b":0.987896762466755},"output":[0]},{"input":{"r":0.22394886320413931,"g":0.3598346233703096,"b":0.5212206692161501},"output":[1]},{"input":{"r":0.6591169171936608,"g":0.7721832881080544,"b":0.03726832783368117},"output":[0]},{"input":{"r":0.32863159106445194,"g":0.49434842316061256,"b":0.52039524148159},"output":[1]},{"input":{"r":0.13321457509145285,"g":0.16065985616947676,"b":0.05237210091422062},"output":[1]},{"input":{"r":0.8575916289161027,"g":0.024267770738099603,"b":0.7982809626869072},"output":[1]},{"input":{"r":0.6117619680995159,"g":0.7349686533680502,"b":0.5555843927438555},"output":[0]},{"input":{"r":0.6423670524765801,"g":0.29253060924149143,"b":0.8770022457796125},"output":[1]},{"input":{"r":0.6641741992925043,"g":0.08361642057512442,"b":0.6298414610167042},"output":[1]},{"input":{"r":0.8886710811148089,"g":0.30504036524093836,"b":0.36431299902888226},"output":[0]},{"input":{"r":0.37509863978404656,"g":0.6450814718300146,"b":0.3229289760518146},"output":[0]},{"input":{"r":0.4779668514729907,"g":0.9083952607979016,"b":0.6812782570352147},"output":[0]},{"input":{"r":0.17612748404329492,"g":0.6938697336586548,"b":0.8863881222748107},"output":[0]},{"input":{"r":0.7285900012644846,"g":0.5766559596834115,"b":0.35103517061726586},"output":[0]},{"input":{"r":0.6087731502959945,"g":0.2349581709780224,"b":0.3207138729715613},"output":[1]},{"input":{"r":0.4564139968347345,"g":0.22317005690364478,"b":0.7513038579553912},"output":[1]},{"input":{"r":0.4841640603382207,"g":0.26300871043993457,"b":0.331607869016753},"output":[1]},{"input":{"r":0.7887955747396755,"g":0.5794115110163585,"b":0.46208932061838226},"output":[0]},{"input":{"r":0.0022237163773763946,"g":0.5321322674338731,"b":0.6260268878748014},"output":[1]},{"input":{"r":0.5934563575252181,"g":0.7335063872897489,"b":0.1841809763822677},"output":[0]},{"input":{"r":0.6058014705575621,"g":0.056923595550666395,"b":0.6968877501207364},"output":[1]},{"input":{"r":0.03469117920835174,"g":0.9836284226220675,"b":0.926163091425966},"output":[0]},{"input":{"r":0.09881366026415561,"g":0.11843418051118593,"b":0.24180772667288997},"output":[1]}]
net.train(data)

const colorE1 = document.getElementById('color')
const guessE1 = document.getElementById('guess')
const whiteButton = document.getElementById('white-button')
const blackButton = document.getElementById('black-button')
const printButton = document.getElementById('print-button')

let color
setRandomColor()

whiteButton.addEventListener('click',()=>{
    chooseColor(1)
})

blackButton.addEventListener('click',()=>{
    chooseColor(0)
})

function chooseColor(value){
    data.push({
        input:color,
        output:[value]
    })
    setRandomColor()
}
printButton.addEventListener('click',print)

function print(){
    console.log(JSON.stringify(data))
}

function setRandomColor(){
    color={
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
    }
    
    const guess = net.run(color)[0]
    guessE1.style.color = guess > .5 ? "#FFF":"#000"
    colorE1.style.backgroundColor = 
    `rgba(${color.r*255},${color.g*255},${color.b*255})`
}
