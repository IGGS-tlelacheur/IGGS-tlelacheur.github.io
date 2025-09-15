#! /usr/bin/env python3
import random
import pygame
import math
import numpy

WIDTH = 1000
HEIGHT = 1000
STARTX = 0.4
STARTY = 0.25
NBALLS=2
GRAVITY=1
RADIUS=475.0
RADBALL=20.0
DAMPING = 0.97
RANDDIST=20
BG=(0,0,0)
CIRCOL = (200,200,200)



class ballObj:
    def __init__(self, circ, color):
        self.shape = circ
        self.speedX=0.0
        self.speedY=0.0
        self.accY=GRAVITY
        self.color = color
        self.collision = False


def collision(balls):
    for i in range(0,NBALLS):
        dist = (((WIDTH/2)-balls[i].shape.centerx)**2 + ((HEIGHT/2)-balls[i].shape.centery)**2)**0.5
        if (dist >= RADIUS - RADBALL) or balls[i].collision :
        
            uNX = ((WIDTH/2)-balls[i].shape.centerx) / dist
            uNY = ((HEIGHT/2)-balls[i].shape.centery) /dist
            #print("1 = :" + str(uNX**2+uNY**2))
            uTX = - uNY
            uTY = uNX

            vX = balls[i].speedX
            vY =balls[i].speedY + balls[i].accY

            #print("speed in = " +str((vX**2+vY**2)**0.5))

            uN = numpy.array([uNX,uNY])
            uT = numpy.array([uTX,uTY])
            v = numpy.array([vX,vY])

            vN = numpy.dot(uN,v)
            vT = numpy.dot(uT,v)
            #print("speed normal and tangential:" + str((vN**2+vT**2)**0.5))

            v2T = numpy.dot(vT,uT)
            v2N = numpy.dot(-vN,uN)

            speedX= (v2N[0] + v2T[0])
            speedY= (v2N[1] + v2T[1])

            speedout = (speedX**2+speedY**2)**0.5
            #print("speed out = " +str(speedout))


            balls[i].speedX = DAMPING*speedX
            balls[i].speedY = DAMPING*speedY
            print("Energy = " + str(0.5*speedout**2 + (HEIGHT-balls[i].shape.centery)))



pygame.init()  
scr = pygame.display.set_mode((WIDTH,HEIGHT))
scr.fill(BG)
pygame.display.set_caption('Chaotic Balls')
circle = pygame.draw.circle(scr,center=(WIDTH/2, HEIGHT/2), radius=RADIUS, color=CIRCOL, width = 2)
balls=[]

for i in range(0,NBALLS):
    color=(random.randint(0,255),random.randint(0,255),random.randint(0,255))
    bal = pygame.draw.circle(scr, center=(WIDTH*STARTX+ random.randint(-RANDDIST,RANDDIST) , HEIGHT*STARTY+ random.randint(-RANDDIST,RANDDIST)), radius=RADBALL,color=color )
    ball = ballObj(bal,color)
    balls.append(ball)

pygame.display.flip()
done = False  

while not done:  
    pygame.time.delay(50)
    scr.fill(BG)
    circle = pygame.draw.circle(scr,center=(WIDTH/2.0, HEIGHT/2.0), radius=RADIUS, color=CIRCOL, width = 4)
    
    
    for i in range(0,NBALLS):
        balls[i].speedY+=balls[i].accY
        centerX = round(balls[i].shape.centerx + balls[i].speedX)
        centerY = round(balls[i].shape.centery + balls[i].speedY)

        dist = (((WIDTH/2)-centerX)**2 + ((HEIGHT/2)-centerY)**2)**0.5
        if dist==0:dist=0.0001
        uNX = ((WIDTH/2)-centerX) / dist
        uNY = ((HEIGHT/2)-centerY) /dist

        if dist> (RADIUS - RADBALL):
            centerX=math.ceil((WIDTH/2)-uNX*(RADIUS - RADBALL))
            centerY=math.ceil((HEIGHT/2)-uNY*(RADIUS - RADBALL))
            balls[i].collision= True

        balls[i].shape = pygame.draw.circle(scr, center=(centerX,centerY) , radius=RADBALL, color=balls[i].color)
        
    collision(balls)

    pygame.display.update()
    for i in range(0,NBALLS):
        balls[i].collision= False
 

    for event in pygame.event.get():  
        if event.type == pygame.QUIT:  
            done = True  


