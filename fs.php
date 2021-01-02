<?
		header('Content-Type: application/json'); 
		//header('Access-Control-Allow-Origin: *');  
		$url = $_REQUEST['url'];
		$str = file_get_contents($url);
		preg_match('/venue: \{\"id(.*)\, showInviteSignupPrompt/', $str, $matches);
		$match = $matches[0]; 
		$match = str_replace("fourSq.venue.pages.VenueDetail.init(", "", $match); 
		$match = str_replace("venue: ", "", $match); 
		$match = str_replace(", showInviteSignupPrompt", "", $match);
		echo $match;
?>