const MAX_ROWS = 8
const MAX_COLS = 8

function printBoard()
{
    for(int i = 0; i < MAX_COLS; i++)
    {
      for(int j = 0;  j < MAX_ROWS; j++)
      {
        if(i===j)
          print(" ");
        else if (j % 2 === 0 && i mod 2 === 1)
          print("X");
        else if (j % 2 === 1 && i mod 2 === 0)
          print(" ");
      }
    }
}


