package com.book.myhybridsqlite;


import com.book.myhybridsqlite.TestDb.Hoby;
import com.book.myhybridsqlite.TestDb.User;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DbHelper extends SQLiteOpenHelper {

	private static final String DATABASE_NAME = "test.db";
	private static final int DATABASE_VERSION = 1;
	
	DbHelper(Context context)
	{
		super(context, DATABASE_NAME, null, DATABASE_VERSION);		
	}
	
	@Override
	public void onCreate(SQLiteDatabase db){
		db.execSQL("Create TABLE " + User.TABLE_NAME + "(" + 
				User.COLUMN1 + " TEXT PRIMARY KEY," + 
				User.COLUMN2 + " TEXT," + 
				User.COLUMN3 + " TEXT);");
		
		db.execSQL("Create TABLE " + Hoby.TABLE_NAME + "(" + 
				Hoby.COLUMN1 + " TEXT PRIMARY KEY," + 
				Hoby.COLUMN2 + " TEXT );");		
	}
	
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion){
	
	}
	
	@Override
	public void onOpen(SQLiteDatabase db){
		super.onOpen(db);
	}
	

	
}
