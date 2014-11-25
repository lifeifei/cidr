var CidrView = {
  storageKey: 'cidrRanges',
  calculateIpRanges: function(cidr) {
    var ipParser = new IpParser(cidr);
    ipParser.parseIp();
    localStorage.setItem(this.storageKey, JSON.stringify(ipParser.ipRanges()));
  },

  displayIpRanges: function() {
    if(localStorage.getItem(this.storageKey)) {
      var ranges = JSON.parse(localStorage.getItem(this.storageKey));
      $('#cidr-result').show();
      $("#cidr-result #cidr").text(ranges.cidr);
      $("#cidr-result #fromIp").text(ranges.fromIp);
      $('#cidr-result #toIp').text(ranges.toIp);
    }
  }
};

$(function() {
  CidrView.displayIpRanges();
  $('#calculate').click(function(event) {
    event.preventDefault();
    CidrView.calculateIpRanges($('#cidrInput').val());
    CidrView.displayIpRanges();
    return false;
  });
});

