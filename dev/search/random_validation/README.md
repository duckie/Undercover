# Data output tests of the random algorithm


To visualize the data, install matplotlib then use those commands.

```ipython --pylab -i data_all.py```

```
In [5]: data_mine.std()
Out[5]: 425.92413926806569
In [6]: data_jb.std()
Out[6]: 429.2155614034603


In [10]: data_mine.var()
Out[10]: 181411.3724112426

In [8]: data_jb.var()
Out[8]: 184225.99815088758

In [10]: imshow(data_mine, interpolation='nearest')
In [11]: imshow(data_jb, interpolation='nearest')

#likely the most interesting

In [12]: boxplot([data_mine.reshape(1, 52*52), data_jb.reshape(1, 52*52))
```
