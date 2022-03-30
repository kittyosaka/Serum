module.exports = async (client, player, track, playload) => {
    try {
    {
        if(player.get('nowplayingMSG').deletable){

           await player.get('nowplayingMSG').delete();
    }
    }
    }catch(err)  { 
    
  }
}