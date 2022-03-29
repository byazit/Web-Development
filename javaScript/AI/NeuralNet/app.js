const net = new brain.NeuralNetwork()
const score = document.getElementById("score")
const showNet = document.getElementById("showNet")
let dataArr = []
const trainData=[
    {input:[0,0], output:[0]},
    {input:[0,1], output:[1]},
    {input:[1,0], output:[1]},
    {input:[1,1], output:[0]},    
]

net.train(trainData,{
    log:(error)=> console.log(error),
    logPeriod: 100
})

dataArr.push(net.run([0,0]))
dataArr.push(net.run([0,1]))
dataArr.push(net.run([1,0]))
dataArr.push(net.run([1,1]))
score.innerHTML = dataArr

showNet.innerHTML= brain.utilities.toSVG(net)
//------------------------------------------------------------------//

//Restaurant
const trainDataRest =[]
const restaurants = {
    "Test_1":"Monday",
    "Test_2":"Tuesday",
    "Test_3":"Wednesday",
    "Test_4":"thursday",
    "Test_5":"Friday",
    "Test_6":"Saturday",
    "Test_7":"Sunday",
}

for(let restName in restaurants){
    const dayOfWeek = restaurants[restName]
    trainDataRest.push({
        input:{[dayOfWeek]:1},
        output:{[restName]:1}
    })
}
const netRest = new brain.NeuralNetwork()
const statsRest = netRest.train(trainDataRest)
const result = netRest.run({"Monday":1})
for(let restName in result){
    console.log(result[restName])
}