radio.onReceivedString(function (receivedString) {
    // Send only completed messages (i.e. does not end in comma)
    if (receivedString.charAt(receivedString.length - 1).compare(",") == 0) {
        outString = "" + outString + receivedString
    } else {
        outString = "" + outString + receivedString
        serial.writeLine(outString)
        // This is used by the sender - it has to receive ack before sending next data
        radio.sendString("ak")
        outString = ""
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    radio.sendString(serialString)
})
let serialString = ""
let outString = ""
radio.setGroup(1)
radio.setTransmitPower(7)
outString = ""
