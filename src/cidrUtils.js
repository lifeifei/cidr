IpParser = function(cidr) {
  this.cidr = cidr;
};

IpParser.prototype  = {
  constructor: IpParser,

  ipRanges: function() {
    return {
      cidr: this.cidr,
      fromIp: this.fromIp,
      toIp: this.toIp
    }
  },
  parseIp: function() {
    var indexOfSeparator = this.cidr.indexOf('/');
    var ip = this.cidr.substring(0,indexOfSeparator);
    var ipArray = ip.split('.').map(function(string){return parseInt(string)});

    var wholeIp = (ipArray[0]<<24) + (ipArray[1]<<16) + (ipArray[2]<<8) + (ipArray[3]) ;
    this.logNumber('wholeIp', wholeIp);


    var toOff = (1<<(32-parseInt(this.cidr.substr(indexOfSeparator+1)))) - 1;
    var fromOff = ~toOff;

    var from = wholeIp & fromOff;
    var to = wholeIp | toOff;

    this.fromIp = this.toIpAddress(from);
    this.toIp = this.toIpAddress(to);

    this.logNumber('fromOff', fromOff);
    this.logNumber('toOff', toOff);
    this.logNumber('from',from);
    this.logNumber('to', to);
    console.log("fromIp:" + this.fromIp);
    console.log("toIp:" + this.toIp);
  },

  toIpAddress: function(value) {
    var buffer = new ArrayBuffer(4);
    var view32 = new Uint32Array(buffer);
    view32[0]= value;
    var view8 = new Uint8Array(buffer);
    var ipAddress = view8[3] + "." + view8[2] + "." + view8[1] + "." + view8[0];
    return ipAddress;
  },

  logNumber: function(message,number) {
    console.log(message + ":"+Number(number).toString(2));
  },

  parseOffset: function(cidr) {
    var offset = cidr.substring((cidr.indexOf('/')+1));
    return parseInt(offset);
  }
};


