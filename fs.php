<?
		$url = $_REQUEST['url'];
		$str = file_get_contents($url);
		preg_match('/fourSq.venue.pages.VenueDetail.init(.*)<\/script>/', $str, $matches);
		$match = $matches[0]; 
		$match = str_replace("fourSq.venue.pages.VenueDetail.init(", "", $match); 
		$match = str_replace(");", "", $match); 
		echo $match;
?>